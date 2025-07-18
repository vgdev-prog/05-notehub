import css from './NoteModal.module.css'
import {type MouseEvent, useEffect} from "react";
import {createPortal} from "react-dom";
import NoteForm from '../NoteForm/NoteForm';

export interface NoteModalProps {
    onClose: () => void;
    tags: string[];
}


const NoteModal = ({onClose, tags}: NoteModalProps) => {
    useEffect(() => {
        const handlePressEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') {
               onClose();
           }
        }

        document.addEventListener('keydown', handlePressEsc)
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handlePressEsc)
            document.body.style.overflow = 'auto';
        }

    }, [onClose]);
    const handleBackdropClick = (event: MouseEvent) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div className={css.backdrop} onClick={handleBackdropClick}>
            <div
                className={css.modal}
                onClick={(event: MouseEvent) => {
                event.stopPropagation();
            }}>
                <NoteForm onClose={onClose} tags={tags} />
            </div>
        </div>,
        document.body
    )
};


export default NoteModal;