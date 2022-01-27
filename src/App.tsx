import classes from "./App.module.scss";
import Layout from "./containers/Layout/Layout";
import Cards from "./components/CardList/Cards";

function App() {
  return (
    <div className={classes.App}>
      <Layout>
        <Cards />
      </Layout>
    </div>
  );
}

export default App;
