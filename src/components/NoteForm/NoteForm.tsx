import css from "./NoteForm.module.css";
import type { NoteCreate, NoteTag } from "../../types/note.ts";
import { type FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService.ts";
import toast from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";

export interface NoteFormProps {
  onClose: () => void;
}

const noteOptions: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();
  
  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note created successfully');
      onClose();
    },
    onError: () => {
      toast.error('Failed to create note');
    }
  });

  const handleSubmit = (
    values: NoteCreate,
    helpers: FormikHelpers<NoteCreate>,
  ) => {
    createNoteMutation.mutate(values, {
      onSuccess: () => {
        helpers.resetForm();
      },
    });
  };


  const schema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title must be max 50 characters")
      .required("Title is required"),
    content: Yup.string()
      .max(500, "Content must be max 500 characters"),
    tag: Yup.string()
      .oneOf(noteOptions, "Please choose a valid tag")
      .required("Tag is required"),
  });

  const formik = useFormik<NoteCreate>({
    initialValues: {
      title: "",
      content: "",
      tag: "Todo",
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });


  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          className={css.input}
        />
        <ErrorMessage error={formik.errors.title as string} className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          value={formik.values.content}
          onChange={formik.handleChange}
          className={css.textarea}
        />
        <ErrorMessage error={formik.errors.content as string} className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={formik.values.tag}
          onChange={formik.handleChange}
          className={css.select}
        >
          {noteOptions.map((tag) => (
            <option value={tag} key={tag}>
              {tag}
            </option>
          ))}
        </select>
        <ErrorMessage error={formik.errors.tag as string} className={css.error} />
      </div>

      <div className={css.actions}>
        <button onClick={onClose} type="button" className={css.cancelButton}>
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={createNoteMutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
