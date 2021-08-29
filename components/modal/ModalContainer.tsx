import * as React from "react";
import "./ModalContainer.scss";
import UserInterfaceClassName from "../../constants/UserInterfaceClassName";
import Modal from "../../services/types/Modal";
import ModalService, {
    ModalEventCallback,
    ModalServiceDestructor,
    ModalServiceEvent
} from "../../services/ModalService";
import { stringifyModalType } from "../../services/types/ModalType";
import { VoidCallback } from "../../interfaces/callbacks";

export interface ModalContainerProps {
    readonly className?: string;
}

export interface ModalContainerState {
    readonly modal: Modal | undefined;
}

export class ModalContainer extends React.Component<ModalContainerProps, ModalContainerState> {

    public static defaultProps: Partial<ModalContainerProps> = {};

    private readonly _currentModalChangedCallback : ModalEventCallback;
    private readonly _closeModalCallback          : VoidCallback;

    private _currentModalListener                 : ModalServiceDestructor | undefined;

    public constructor (props: ModalContainerProps) {

        super(props);

        this.state = {
            modal: undefined
        };

        this._currentModalListener = undefined;
        this._currentModalChangedCallback = this._onCurrentModalChange.bind(this);
        this._closeModalCallback          = this._onCloseModal.bind(this);

    }

    public componentDidMount (): void {

        const modal = ModalService.getCurrentModal();

        if (this.state.modal !== modal) {
            this.setState({modal: modal});
        }

        ModalService.on(ModalServiceEvent.CURRENT_MODAL_CHANGED, this._currentModalChangedCallback);

    }

    public componentWillUnmount (): void {

        if (this._currentModalListener) {
            this._currentModalListener();
            this._currentModalListener = undefined;
        }

    }

    public render () {

        const modal     = this.state.modal;

        if (!modal) {
            return null;
        }

        const component = modal.getComponent();
        const type      = modal.getType();

        return (
            <div className={
                UserInterfaceClassName.MODAL_CONTAINER
                + ' ' + (this.props.className ?? '')
                + ' ' + UserInterfaceClassName.MODAL_CONTAINER + '-type-' + (stringifyModalType(type))
            }
                onClick={this._closeModalCallback}
            >{
                <div className={UserInterfaceClassName.MODAL_CONTAINER + '-content'}>{component}</div>
            }</div>
        );

    }

    private _onCurrentModalChange () {

        const newModal = ModalService.getCurrentModal();
        if (this.state.modal !== newModal) {
            this.setState(() => ({modal: ModalService.getCurrentModal()}));
        }

    }

    private _onCloseModal () {
        if (this.state.modal !== undefined) {
            ModalService.removeModal(this.state.modal);
        }
    }

}

export default ModalContainer;
