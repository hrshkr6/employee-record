import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
/**
 * @customElement
 * @polymer
 */
class EmployeeTable extends PolymerElement {
  static get template() {
    return html`
      <style>
      .table-container{
        border: 2px solid #ccc;
        border-radius: 10px;
        padding: 20px;
      }

      table {
        border-collapse: collapse;
        width: 100%;
        font-family: Arial, sans-serif;
      }

      tr{
        height: 50px;
      }
    
      th {
        background-color: #f2f2f2;
        color: #444;
        font-weight: bold;
        text-align: center;
        padding: 8px;
        border: 1px solid #ddd;
      }
    
      td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
      }

      
      .button-group {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .button-group button:first-child{
        margin-right: 8px;
      }

      button {
        background-color: #333;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
      }

      button:hover {
        background-color: #fff;
        color: #333;
        border: 1px solid #333;
      }

      .button-group button {
        padding: 6px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    
      .button-group button:hover {
        background-color: #3e8e41;
      }
    
      .button-group button:first-child {
        margin-right: 8px;
      }

      h3 {
        font-size: 1.5rem;
        margin-bottom: 20px;
        text-align: center;
      }
      </style>
      <template is="dom-if" if="[[employeeList.length]]">
        <div class="table-container">
          <h3>Employees Record</h3>
          <table>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone No.</th>
              <th>Employee ID</th>
              <th>Delete/Edit Record</th>
            </tr>
            <template is="dom-repeat" items="{{employeeList}}">
              <tr>
                <template is="dom-repeat" items="{{item}}">
                  <td><span>{{item.task}}</span></td>
                </template>
                <td>
                  <span class="button-group button-width">
                    <button on-click="editTask">Edit</button>
                    <button on-click="deleteTask">Delete</button>
                  </span>
                </td>
              </tr>
            </template>
          </table>
        </div>
      </template>
    `;
  }

  static get properties() {
    return {
      employeeList: {
        type: Array,
        value: []
      },
      editIndex: {
        type: Number,
        value: -1,
        notify: true
      }
    };
  }

  
  deleteTask(event) {
    const index = event.model.index;
    this.splice("employeeList", index, 1);
  }

  editTask(event) {
    this.editIndex = event.model.index;
  }
}

window.customElements.define("employee-table", EmployeeTable);
