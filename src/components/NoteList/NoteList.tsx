import css from "./NoteList.module.css";
import type { Note } from "../../types/note.ts";
import NoteItem from "./NoteItem.tsx";

export interface NoteListProps {
  notes: Note[];
  setCurrentNote: (note: Note) => void;
}

const NoteList = ({ notes, setCurrentNote }: NoteListProps) => {
  return (
    <ul className={`${css.list} container`}>
      {notes.map((note) => (
        <NoteItem
          note={note}
          key={note.id}
          setCurrentNote={setCurrentNote}
        />
      ))}
    </ul>
  );
};

export default NoteList;
