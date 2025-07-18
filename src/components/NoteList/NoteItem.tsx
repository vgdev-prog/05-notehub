import css from "./NoteList.module.css";
import type { Note } from "../../types/note.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService.ts";
import { type MouseEvent } from "react";
import toast from "react-hot-toast";

export interface NoteItemProps {
  note: Note;
}

const NoteItem = ({ note }: NoteItemProps) => {
  const queryClient = useQueryClient();
  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete note');
    }
  });

  return (
    <li className={css.listItem}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.content}>{note.content}</p>
      <div className={css.footer}>
        <span className={css.tag}>{note.tag}</span>
        <button
          onClick={(event: MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            deleteNoteMutation.mutate(note.id);
          }}
          className={css.button}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default NoteItem;
