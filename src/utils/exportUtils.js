import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/**
 * Extract plain value from a cell (handling render functions)
 * @param {any} value - The cell value
 * @param {object} record - The record object
 * @param {function} render - The render function if present
 * @returns {string} - Plain text value
 */
const extractCellValue = (value, record, render) => {
    if (render) {
        // If there's a render function, try to extract text content
        try {
            const rendered = render(value, record);
            if (rendered && typeof rendered === "object") {
                // Handle React elements - try to extract text
                if (rendered.props && rendered.props.children) {
                    const children = rendered.props.children;
                    if (typeof children === "string") {
                        return children;
                    }
                    if (Array.isArray(children)) {
                        return children.join(" ");
                    }
                    // For StatusBadge or other complex components
                    return rendered.props.statusCode?.toString() || value?.toString() || "";
                }
                // For simple objects like StatusBadge with props
                return rendered.props?.statusCode?.toString() || value?.toString() || "";
            }
            return String(rendered || value || "");
        } catch (e) {
            return value?.toString() || "";
        }
    }
    return value?.toString() || "";
};

/**
 * Transform columns and data for export
 * @param {Array} columns - Column definitions
 * @param {Array} data - Data to export
 * @returns {Array} - Transformed data with only exportable columns
 */
export const transformDataForExport = (columns, data) => {
    if (!columns || !data) return [];

    // Filter out columns without dataIndex (like action columns)
    const exportableColumns = columns.filter(
        (col) => col.dataIndex && col.key !== "10"
    );

    return data.map((record) => {
        const row = {};
        exportableColumns.forEach((column) => {
            const value = record[column.dataIndex];
            row[column.title] = extractCellValue(value, record, column.render);
        });
        return row;
    });
};

/**
 * Export data to Excel file
 * @param {Array} data - Data to export
 * @param {string} filename - Name of the file (without extension)
 * @param {Array} columns - Column definitions for the table
 */
export const exportToExcel = (data, filename, columns) => {
    try {
        const transformedData = transformDataForExport(columns, data);

        // Create workbook and worksheet
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(transformedData);

        // Auto-size columns based on content
        const colWidths = Object.keys(transformedData[0] || {}).map((key) => ({
            wch: Math.max(
                key.length,
                ...transformedData.map((row) => (row[key] || "").toString().length)
            ) + 2,
        }));
        ws["!cols"] = colWidths;

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, filename);

        // Generate Excel buffer and save
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        saveAs(blob, `${filename}_${new Date().toISOString().split("T")[0]}.xlsx`);
    } catch (error) {
        console.error("Error exporting to Excel:", error);
    }
};

/**
 * Export data to CSV file
 * @param {Array} data - Data to export
 * @param {string} filename - Name of the file (without extension)
 * @param {Array} columns - Column definitions for the table
 */
export const exportToCSV = (data, filename, columns) => {
    try {
        const transformedData = transformDataForExport(columns, data);

        // Create CSV content
        const worksheet = XLSX.utils.json_to_sheet(transformedData);
        const csvContent = XLSX.utils.sheet_to_csv(worksheet);

        // Create blob and save
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
        saveAs(blob, `${filename}_${new Date().toISOString().split("T")[0]}.csv`);
    } catch (error) {
        console.error("Error exporting to CSV:", error);
    }
};
