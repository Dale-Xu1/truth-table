import React, { ChangeEvent, FormEvent } from "react"
import "./App.css"

interface Props { }

interface State
{
    equation: string
}

class App extends React.Component<Props>
{

    public state: State =
    {
        equation: ""
    }


    public constructor(props: Props)
    {
        super(props)
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    private handleSubmit(e: FormEvent)
    {
        e.preventDefault()
        console.log(this.state.equation);
    }

    private handleChange(e: ChangeEvent<HTMLInputElement>)
    {
        this.setState({ equation: e.target.value });
    }

    public render(): React.ReactElement
    {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.equation} onChange={this.handleChange} />
                    <input type="submit" value="Generate" />
                </form>
            </div>
        )
    }

}

export default App;
