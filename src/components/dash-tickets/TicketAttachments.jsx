import { Image } from "antd";
import { FiExternalLink, FiFileText, FiImage } from "react-icons/fi";

import { getAttachmentName, getAttachmentUrl, isImageAttachment } from "../../utils/tickets";

const openAttachment = (url) => window.open(url, "_blank", "noopener,noreferrer");

const TicketAttachments = ({ attachments }) => {
    if (attachments.length === 0) return null;

    return (
        <section className="mt-4 w-full rounded-md border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-base font-semibold text-slate-800">Allegati</h2>
                <span className="text-xs font-medium text-slate-500">{attachments.length} file</span>
            </div>
            <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {attachments.map((file) => {
                    const url = getAttachmentUrl(file);
                    const name = getAttachmentName(file);
                    const image = isImageAttachment(file);
                    return (
                        <div key={file?.attachmentId || url} className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
                            {image ? (
                                <Image src={url} className="w-full bg-slate-100 object-cover" preview alt={name} style={{ height: "130px" }} />
                            ) : (
                                <button type="button" onClick={() => openAttachment(url)} className="flex h-[130px] w-full flex-col items-center justify-center gap-2 bg-slate-100 p-4 text-center transition hover:bg-slate-200">
                                    <FiFileText className="text-3xl text-slate-500" />
                                    <span className="line-clamp-2 text-xs font-semibold text-slate-700">{name}</span>
                                </button>
                            )}
                            <div className="flex items-center justify-between gap-2 border-t border-slate-200 px-3 py-2">
                                <div className="flex min-w-0 items-center gap-2">
                                    {image ? <FiImage className="shrink-0 text-slate-500" /> : <FiFileText className="shrink-0 text-slate-500" />}
                                    <span className="truncate text-xs font-medium text-slate-700">{name}</span>
                                </div>
                                {!image && <button type="button" onClick={() => openAttachment(url)} className="shrink-0 rounded-md p-1 text-slate-500 hover:text-slate-800" aria-label={`Apri ${name}`}><FiExternalLink /></button>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default TicketAttachments;
