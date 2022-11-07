import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCells = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };
  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>{this.renderCells(item, column)}</td>
            ))}
          </tr>
        ))}
        <tr>
          <td></td>
        </tr>
      </tbody>
    );
  }
}

export default TableBody;
