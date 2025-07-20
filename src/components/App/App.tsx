import { useEffect, useState } from "react";
import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox.tsx";
import Error from "../Error/Error.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService.ts";
import NoteList from "../NoteList/NoteList.tsx";
import Loader from "../Loader/Loader.tsx";
import { Modal } from "../Modal/Modal.tsx";
import NoteForm from "../NoteForm/NoteForm.tsx";
import { useDebounce } from "use-debounce";

function App() {
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onSearch = (query: string) => {
    setQuery(query);
  };

  const onClickCreateBtn = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, debouncedQuery],
    queryFn: () => fetchNotes({ page, search: debouncedQuery }),
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  if (error) {
    return (
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSearch={onSearch} />
          {data && data.totalPages > 1 && (
            <Pagination
              page={page}
              setPage={setPage}
              totalPages={data.totalPages}
            />
          )}
          <button onClick={onClickCreateBtn} className={css.button}>
            Create note +
          </button>
        </header>
        <Error message={"Failed to load notes"} />
      </div>
    );
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={onSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={data.totalPages}
          />
        )}
        <button onClick={onClickCreateBtn} className={css.button}>
          Create note +
        </button>
      </header>

      <div className={css.maxWidth}>
        {isLoading ? (
            <Loader />
        ) : (
            data && data.notes.length > 0 && (
                <NoteList notes={data.notes} />
            )
        )}
      </div>

      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <NoteForm onClose={closeModal} />
      </Modal>
    </div>
  );
}

export default App;
