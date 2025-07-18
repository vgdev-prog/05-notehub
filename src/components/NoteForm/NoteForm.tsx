import css from "./NoteForm.module.css";
import type { NoteCreate } from "../../types/note.ts";
import { type FormikHelpers, useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { store } from "../../services/noteService.ts";
import toast from "react-hot-toast";

export interface NoteFormProps {
  onClose: () => void;
  tags: string[];
}


interface InitialValues {
  title: string;
  content: string;
  tag: string;
}

const NoteForm = ({ onClose, tags }: NoteFormProps) => {
  const queryClient = useQueryClient();
  const createNote = useMutation({
    mutationFn: store,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note created successfully');
    },
    onError: () => {
      toast.error('Failed to create note');
    }
  });

  const handleSubmit = (
    values: InitialValues,
    helpers: FormikHelpers<InitialValues>,
  ) => {
    createNote.mutate(values, {
      onSuccess: () => {
        helpers.resetForm();
        onClose();
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
      .oneOf(tags, "Please choose a valid tag")
      .required("Tag is required"),
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      title: "",
      content: "",
      tag: tags[0] || "",
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
        <ErrorMessage name="title" component="span" className={css.error} />
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
        <ErrorMessage name="content" component="span" className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={formik.values.tag}
          onChange={formik.handleChange}
          disabled={!tags.length}
          className={css.select}
        >
          {tags.map((tag) => (
            <option value={tag} key={tag}>
              {tag}
            </option>
          ))}
        </select>
        <ErrorMessage name="tag" component="span" className={css.error} />
      </div>

      <div className={css.actions}>
        <button onClick={onClose} type="button" className={css.cancelButton}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
