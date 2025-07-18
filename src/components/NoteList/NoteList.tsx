import css from "./NoteList.module.css";
import type { Note } from "../../types/note.ts";
import NoteItem from "./NoteItem.tsx";

export interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  if (notes.length === 0) {
    return null;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <NoteItem
          note={note}
          key={note.id}
        />
      ))}
    </ul>
  );
};

export default NoteList;
