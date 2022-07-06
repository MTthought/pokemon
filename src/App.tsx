import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as listActions from "./redux/actions/listActions";
import { bindActionCreators } from "redux";
import "./App.css";
import ListPage from "./components/list/ListPage";
import DetailsPage from "./components/details/DetailsPage";
import Footer from "./components/common/Footer";
import { ReduxProps } from "./Types";

function App({ actions, list }: ReduxProps) {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ListPage actions={actions} list={list} />} />
        <Route
          path=":name"
          element={<DetailsPage actions={actions} list={list} />}
        />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

function mapStateToProps(state: any) {
  return {
    list: state.list,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(listActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
