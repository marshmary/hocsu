import { Button, Pagination, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import Table from "~/components/Table";
import EventFilter from "~/components/Admin/Admin.EventFilter";
import Modal from "~/components/Modal/Modal";
import { useModal } from "~/components/Modal";
import ModalCreate from "./Admin.ModalCreate";
import ModalDelete from "./Admin.ModalDelete";

const AdminLayout = () => {
    const { open: modalCreate, setOpen: setModalCreate } = useModal();
    const { open: modalDelete, setOpen: setModalDelete } = useModal();

    const heads = ["Name", "Time", "Content"];
    const rows: TableRowData[] = [
        {
            id: "1",
            name: <p>Khởi nghĩa Phùng Hưng</p>,
            time: <p className="whitespace-nowrap">766-791</p>,
            content: (
                <p className="truncate sm:whitespace-normal w-72 sm:w-auto">
                    Khởi nghĩa diễn ra nhằm chống lại chính sách cai trị hà khắc
                    của nhà Đường, cuộc khởi nghĩa đã chiếm được phủ Tống Bình,
                    giành quyền tự chủ trong vài năm.
                </p>
            ),
        },
        {
            id: "2",
            name: "Khởi nghĩa Mai Thúc Loan",
            time: <p className="whitespace-nowrap">713-722</p>,
            content: (
                <p className="truncate sm:whitespace-normal w-72 sm:w-auto">
                    Dưới ách thống trị tàn bạo của nhà Đường, từ Hoan Châu khởi
                    nghĩa lan rộng khắp nơi, Mai Thúc Loan cho xây thành Vạn An
                    (Nam Đàn-Nghệ An), đánh chiếm phủ Tống Bình. Cuộc khởi nghĩa
                    đã giành và giữ chính quyền độc lập gần 10 năm.
                </p>
            ),
        },
        {
            id: "3",
            name: <p>Khởi nghĩa Phùng Hưng</p>,
            time: <p className="whitespace-nowrap">766-791</p>,
            content: (
                <p className="truncate sm:whitespace-normal w-72 sm:w-auto">
                    Khởi nghĩa diễn ra nhằm chống lại chính sách cai trị hà khắc
                    của nhà Đường, cuộc khởi nghĩa đã chiếm được phủ Tống Bình,
                    giành quyền tự chủ trong vài năm.
                </p>
            ),
        },
    ];
    const rowOptions = (
        <span className="flex gap-3">
            <p className="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer">
                Edit
            </p>
            <p
                className="font-medium text-red-600 hover:underline dark:text-red-500 cursor-pointer"
                onClick={() => {
                    setModalDelete(true);
                }}
            >
                Delete
            </p>
        </span>
    );

    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="bg-[#F0F0F5] w-screen min-h-screen">
            <div className="flex justify-between p-3">
                <div className="text-lg font-bold">Event list</div>
                <Button
                    color="success"
                    onClick={() => {
                        setModalCreate(true);
                    }}
                >
                    Add new
                </Button>
            </div>
            <div className="p-3">
                <EventFilter />
            </div>
            <div className="p-3">
                <Table
                    heads={heads}
                    rows={rows}
                    hasRowOptions
                    rowOptions={rowOptions}
                />
                <div className="mt-2 w-full grid place-items-start">
                    <Pagination
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        showIcons={true}
                        totalPages={100}
                    />
                </div>
            </div>

            <ModalCreate open={modalCreate} setOpen={setModalCreate} />
            <ModalDelete open={modalDelete} setOpen={setModalDelete} />
        </div>
    );
};

export default AdminLayout;
