import DefModal from "./Modal";
import DefButton from "../Buttons";

export const ConfirmModal = ({ onConfirm, open, setOpen }) => {
    return (
        <DefModal
            title={"Attenzione"}
            isModalOpen={open}
            onClose={setOpen}>
            <div>
                <p>Sei sicuro di voler eliminare questo elemento?</p>
                <div className="flex justify-end gap-2">
                    <DefButton
                        type="primary"
                        onClick={() => {
                            onConfirm();
                            setOpen();
                        }}
                        danger>
                        Conferma
                    </DefButton>
                    <DefButton onClick={setOpen}>Annulla</DefButton>
                </div>
            </div>
        </DefModal>
    );
};
