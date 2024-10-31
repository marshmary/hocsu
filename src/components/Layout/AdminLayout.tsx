import { AppShell, Burger, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router";
import PageLoadAnimation from "../Loading/PageLoadAnimation";
import { AdminLayoutNavbar } from "./AdminLayout.Navbar";

export const AdminLayout = () => {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            padding="md"
        >
            <AppShell.Header className="p-4 flex flex-row items-center gap-4">
                <Burger
                    opened={mobileOpened}
                    onClick={toggleMobile}
                    hiddenFrom="sm"
                    size="sm"
                />
                <Burger
                    opened={desktopOpened}
                    onClick={toggleDesktop}
                    visibleFrom="sm"
                    size="sm"
                />
                <Title order={3}>Admin</Title>
            </AppShell.Header>

            <AppShell.Navbar p="md" className="flex flex-col gap-4">
                <AdminLayoutNavbar />
            </AppShell.Navbar>

            <AppShell.Main className="bg-[#F0F0F5]">
                <PageLoadAnimation key="">
                    <Outlet />
                </PageLoadAnimation>
            </AppShell.Main>
        </AppShell>
    );
};
