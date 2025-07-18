import {useMutation, useQueryClient} from "@tanstack/react-query";
import { deleteNote } from '../services/noteService.ts'
import toast from "react-hot-toast";

export const useDeleteNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteNote(id),
        onSuccess: async () => {
          await  queryClient.invalidateQueries({queryKey: ['notes']});
        },
        onError:(error) => {
            toast.error(error.message)
        }
    });
}
