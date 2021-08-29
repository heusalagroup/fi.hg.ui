import * as React from "react";
import "./ModalContainer.scss";

export interface ModalContainerProps {
    readonly className?: string;
}

export interface ModalContainerState {
}

export class ModalContainer extends React.Component<ModalContainerProps, ModalContainerState> {

    public static defaultProps: Partial<ModalContainerProps> = {};

    public constructor (props: ModalContainerProps) {
        super(props);
    }

    public render () {

        return (
            <div className={ClassName. + ' ' + (this.props.className ?? '')}>

            </div>

        );

    }

}

export default ModalContainer;
