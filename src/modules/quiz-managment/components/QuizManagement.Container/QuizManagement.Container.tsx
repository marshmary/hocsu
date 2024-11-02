import { Button, Pagination } from "flowbite-react";
import { useMemo, useState } from "react";
import Loading from "~/components/Loading/Loading";
import { useModal } from "~/components/Modal";
import Table from "~/components/Table";
import { useQuizListQuery } from "../../queries/quiz-list.query";
import { QuizManagementModalDetele } from "../QuizManagement.ModalDelete";
import { QuizManagementModalUpsert } from "../QuizManagement.ModalUpsert";
import { QuizManagementFilter } from "./QuizManagement.Filter";

export const QuizManagementContainer = () => {
  const { open: modalCreate, setOpen: setModalCreate } = useModal();
  const { open: modalDelete, setOpen: setModalDelete } = useModal();
  const [selectedItem, setSelectedItem] = useState<Quiz | null>(null);

  const [filter, setFilter] = useState<QuizFilter>({
    limit: 50,
    page: 1,
  });

  const { data, isFetching, refetch } = useQuizListQuery(filter);
  const pageCount = useMemo(() => data?.pageCount || 0, [data?.pageCount]);
  const rowsData = useMemo(
    () =>
      (data?.data || []).map((each) => ({
        id: each.id,
        event: each.event,
        question: each.question,
        actions: (
          <div className="flex gap-3">
            <span
              className="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer"
              onClick={() => {
                setSelectedItem(each);
                setModalCreate(true);
              }}
            >
              Edit
            </span>
            <span
              className="font-medium text-red-600 hover:underline dark:text-red-500 cursor-pointer"
              onClick={() => {
                setSelectedItem(each);
                setModalDelete(true);
              }}
            >
              Delete
            </span>
          </div>
        ),
      })),
    [data?.data]
  );

  const heads = ["Event", "Question", ""];

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFilter({ ...filter, page: page });
  };
  return (
    <div className="bg-[#F0F0F5]">
      <div className="flex justify-between p-3">
        <div className="text-2xl font-semibold">Quiz management page</div>
        <Button
          color="success"
          onClick={() => {
            setSelectedItem(null);
            setModalCreate(true);
          }}
        >
          Add new
        </Button>
      </div>
      <div className="p-3">
        <QuizManagementFilter setFilter={setFilter} />
      </div>
      <div className="p-3">
        {isFetching ? (
          <div className="w-full grid place-items-center">
            <Loading />
          </div>
        ) : rowsData && rowsData.length === 0 ? (
          <div className="w-full grid place-items-center">No item found</div>
        ) : (
          <>
            <Table heads={heads} rows={rowsData} hasRowOptions={false} />
            {rowsData && pageCount > 1 && (
              <div className="mt-2 w-full grid place-items-start">
                <Pagination
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  showIcons={true}
                  totalPages={pageCount}
                />
              </div>
            )}
          </>
        )}
      </div>

      <QuizManagementModalUpsert
        open={modalCreate}
        setOpen={(open: boolean) => {
          setModalCreate(open);
        }}
        successCallback={refetch}
        selectedItem={selectedItem}
      />

      <QuizManagementModalDetele
        open={modalDelete}
        setOpen={(open: boolean) => {
          setModalDelete(open);
        }}
        successCallback={refetch}
        selectedItem={selectedItem}
      />
    </div>
  );
};
