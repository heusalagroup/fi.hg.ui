// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import * as React from "react";
import "./PipelineRun.scss";
import UserInterfaceClassName from "../../../constants/UserInterfaceClassName";
import PipelineModel from "../../../../pipeline/types/PipelineModel";
import ControllerControllerStateDTO
    from "../../../../pipeline/controllers/types/ControllerStateDTO";
import TextAreaField from "../../fields/textArea/TextAreaField";

export interface PipelineRunProps {

    readonly className      ?: string;
    readonly pipelineModel  ?: PipelineModel;
    readonly pipelineState  ?: ControllerControllerStateDTO;

}

export interface PipelineRunState {
}

export class PipelineRun extends React.Component<PipelineRunProps, PipelineRunState> {

    public static defaultProps: Partial<PipelineRunProps> = {};

    public constructor (props: PipelineRunProps) {
        super(props);
    }

    public render () {

        return (
            <div className={UserInterfaceClassName.PIPELINE_RUN + ' ' + (this.props.className ?? '')}>

                <TextAreaField value={JSON.stringify(this.props.pipelineModel, null, 2)} />
                <TextAreaField value={JSON.stringify(this.props.pipelineState, null, 2)} />

            </div>
        );

    }

}

export default PipelineRun;
