import Container from "../components/container";
import TasksList from "../core-components/tasks-list";
import TasksSummary from "../core-components/tasks-summary";

export default function PageHome() {
  return(
    <Container as="article" className="space-y-3">
      <header className="flex justify-between items-center gap-6">
        <TasksSummary/>
      </header>
      <TasksList/>
    </Container>
  )
}