import { Sidebar } from "flowbite-react";
import { FunctionComponent } from "react";
import Icon from "../Icon";

interface GuideLayoutProps {}

interface LiveEmbeded {
    id: string;
    title: string;
    src: string;
}

const GuideLayout: FunctionComponent<GuideLayoutProps> = () => {
    const embeded: LiveEmbeded[] = [
        {
            id: "search_timeline",
            title: "Search timeline",
            src: "https://app.tango.us/app/embed/bd4a4e7a-84b0-4385-a8f6-a3215204c048?iframe",
        },
        {
            id: "search_events",
            title: "Search events",
            src: "https://app.tango.us/app/embed/8c4acf61-dba1-459c-a355-d3f8975f5ea5?iframe",
        },
        {
            id: "add_new",
            title: "Add new event",
            src: "https://app.tango.us/app/embed/56f44d2d-f441-4d92-aaed-22a9c8af6ff2?iframe",
        },
        {
            id: "edit_event",
            title: "Edit event",
            src: "https://app.tango.us/app/embed/297a616b-0470-43ef-af49-1591f332cce4?iframe",
        },
        {
            id: "delete_event",
            title: "Delete event",
            src: "https://app.tango.us/app/embed/140a2e29-41ba-40cf-9a91-344e2bb576ea?iframe",
        },
    ];

    return (
        <div className="w-100 min-h-screen flex flex-row scroll-smooth">
            <div className="w-fit fixed h-full -left-[16rem] md:left-0">
                <Sidebar aria-label="Default sidebar example">
                    <Sidebar.Logo href="#" img="vite.svg" imgAlt="Hocsu logo">
                        User guide
                    </Sidebar.Logo>
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item href="#search_timeline">
                                Search timeline
                            </Sidebar.Item>
                            <Sidebar.Item href="#search_events">
                                Search events
                            </Sidebar.Item>
                            <Sidebar.Item href="#add_new">Create</Sidebar.Item>
                            <Sidebar.Item href="#edit_event">Edit</Sidebar.Item>
                            <Sidebar.Item href="#delete_event">
                                Delete
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item href="/">Back to Home</Sidebar.Item>
                            <Sidebar.Item href="/admin">
                                Go to Admin
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
            <div className="w-full pl-0 md:pl-[16rem]">
                {embeded.map((item) => (
                    <iframe
                        key={item.id}
                        id={item.id}
                        className="w-full h-screen"
                        src={item.src}
                        sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin"
                        security="restricted"
                        title={item.title}
                        referrerPolicy="strict-origin-when-cross-origin"
                        frameBorder="0"
                        allowFullScreen={true}
                    ></iframe>
                ))}
            </div>
        </div>
    );
};

export default GuideLayout;
