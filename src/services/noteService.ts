import type { Note, NoteCreate } from "../types/note.ts";
import { http } from "../libs/api-service.ts";
import { routes } from "../constants";
import { Sorting } from "../enums";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  search?: string;
  perPage?: number;
  sortBy?: Sorting;
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const { page = 1, search, perPage = 12, sortBy = Sorting.CREATED } = params;
  
  const urlParams = new URLSearchParams();
  if (search) {
    urlParams.set("search", search);
  }
  urlParams.set("page", page.toString());
  urlParams.set("perPage", perPage.toString());
  urlParams.set("sortBy", sortBy);

  const { data } = await http.get<FetchNotesResponse>(
    `${routes.all}?${urlParams.toString()}`,
  );
  return data;
};

export const createNote = async (note: NoteCreate): Promise<Note> => {
  const { data } = await http.post<Note>(routes.create, note);
  return data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const { data } = await http.delete<Note>(routes.delete(id));
  return data;
};

export const getById = async (id: number): Promise<Note> => {
  const { data } = await http.get<Note>(routes.getById(id));
  return data;
};
