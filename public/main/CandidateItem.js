import Component from '../Component.js';

class CandidateItem extends Component {

    renderHTML() {
        const candidate = this.props;
        const name = candidate.candidate_name;
        //const id = candidate.candidate_id;
        return /*html*/`
        <div>
            <li>
                <h2>${name}</h2>
            </li>
        </div>
        `;
    }
}

export default CandidateItem;
