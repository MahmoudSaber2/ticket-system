import { Tabs as AntTabs } from "antd";
const TabPane = AntTabs.TabPane;

const Tabs = ({ items, callback }) => {
    return (
        <AntTabs defaultActiveKey="1" onChange={callback}>
            {items.map((item, index) => (
                <TabPane tab={item.label} key={index + 1}>
                    {item.content}
                </TabPane>
            ))}
        </AntTabs>
    );
};

export default Tabs;
