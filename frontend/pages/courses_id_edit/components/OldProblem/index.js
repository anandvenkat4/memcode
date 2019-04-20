import * as ProblemApi from '~/api/Problem';

import { Problem } from '~/components/Problem';
import { Checkbox } from './components/Checkbox';

import css from './index.css';

class OldProblem extends React.Component {
  static propTypes = {
    problem: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    updateOldProblem: PropTypes.func.isRequired,
    problems: PropTypes.array.isRequired,
    idsOfCheckedProblems: PropTypes.array.isRequired,
    updateIdsOfCheckedProblems: PropTypes.func.isRequired
  }

  state = { speSave: { status: 'success' } }

  apiSave = () =>
    ProblemApi.update(
      (spe) => this.setState({ speSave: spe }),
      this.props.problem.id,
      this.props.problem
    )

  updateProblemContent = (problemContent) =>
    this.props.updateOldProblem({
      ...this.props.problem, content: problemContent
    })

  ifOptimistic = () =>
    !this.props.problem._optimistic_id


  ifChecked = () =>
    this.props.idsOfCheckedProblems.includes(this.props.problem.id)

  render = () => (
    this.ifOptimistic() ?
      <div className={`${css['old-problem']} ${this.ifChecked() ? '-checked' : '-not-checked'}`}>
        <Checkbox
          id={this.props.problem.id}
          index={this.props.index}
          problems={this.props.problems}
          idsOfCheckedProblems={this.props.idsOfCheckedProblems}
          updateIdsOfCheckedProblems={this.props.updateIdsOfCheckedProblems}
          speSave={this.state.speSave}
          ifChecked={this.ifChecked()}
        />

        <Problem
          mode="edit"
          problemContent={this.props.problem.content}
          updateProblemContent={this.updateProblemContent}
          problemType={this.props.problem.type}
          apiSave={this.apiSave}
        />
      </div> :
      <div className={css['old-problem']}>
        <Problem
          mode="show"
          problemContent={this.props.problem.content}
          problemType={this.props.problem.type}
        />
      </div>
  )
}

export { OldProblem };
