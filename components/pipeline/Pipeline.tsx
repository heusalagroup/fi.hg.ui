import * as React from "react";
import "./Pipeline.scss";
import UserInterfaceClassName from "../../constants/UserInterfaceClassName";
import PipelineModel, { parsePipelineModel } from "../../../pipeline/types/PipelineModel";
import TextAreaField, { TextAreaFieldProps } from "../fields/textArea/TextAreaField";
import LogService from "../../../ts/LogService";
import { isEqual } from "../../../ts/modules/lodash";
import { parseJson } from "../../../ts/Json";
import { ChangeCallback } from "../../interfaces/callbacks";

const LOG = LogService.createLogger('Pipeline');

export interface PipelineProps {

    readonly className ?: string;
    readonly model      : PipelineModel;
    readonly change    ?: ChangeCallback<PipelineModel>;

}

export interface PipelineState {

    readonly model : string;

}

export class Pipeline extends React.Component<PipelineProps, PipelineState> {

    private readonly _changeCallback : ChangeCallback<string | undefined>;

    public static defaultProps: Partial<PipelineProps> = {};

    public constructor (props: PipelineProps) {

        super(props);

        this.state = {
            model: ''
        };

        this._changeCallback = this._onChange.bind(this);

    }

    public componentDidMount (): void {

        this._updateModelFromUpstream();

    }

    public componentDidUpdate (prevProps: Readonly<PipelineProps>, prevState: Readonly<PipelineState>, snapshot?: any): void {

        if (prevProps.model !== this.props.model) {
            this._updateModelFromUpstream();
        }

    }

    public render () {

        const fieldOpts : Partial<TextAreaFieldProps> = {};

        if (this.props?.change) {
            fieldOpts.change = this._changeCallback;
        }

        return (
            <div className={UserInterfaceClassName.PIPELINE + ' ' + (this.props.className ?? '')}>

                <TextAreaField
                    className={UserInterfaceClassName.PIPELINE + '-field'}
                    value={this.state.model}
                    {...fieldOpts}
                />

            </div>
        );

    }

    private _updateModelFromUpstream () {

        try {

            const model        = this.props.model;
            const currentModel = parseJson(this.state.model) ?? {};

            if (!isEqual(currentModel, model)) {

                const jsonString = JSON.stringify(this.props.model, null, 2);

                this.setState({
                    model: jsonString
                });

            }

        } catch(err) {
            LOG.error(`Could not stringify model: `, err);
        }

    }

    private _onChange (value : string|undefined) {

        const model = parsePipelineModel( parseJson(value) );

        if (model) {

            if (this.props.change) {
                this.props.change(model);
            } else {
                LOG.warn(`_onChange: Did not have change prop for upstream`);
            }

        } else {
            LOG.warn(`_onChange: Pipeline model invalid: `, model);
        }

    }

}

export default Pipeline;
