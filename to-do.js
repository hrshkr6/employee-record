import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-input/paper-input.js";
import "./form-field.js";
import "./employee-table.js";

/**
 * @customElement
 * @polymer
 */
class ToDo extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          font-family: Arial, sans-serif;
          font-size: 16px;
        }

        .container {
          display: flex;
          flex-direction: row;
          margin-bottom: 16px;
          justify-content: space-between;
        }

        .container form-field{
          width:24%;
        }

        .container employee-table{
          width:70%;
        }
      </style>
      <div class="container">
        <form-field task-list="{{employeeList}}" edit-index="{{editingIndex}}"></form-field>
        <employee-table id="employeeTable" employee-list="{{employeeList}}" edit-index="{{editingIndex}}"></employee-table>
      </div>
    `;
  }

  static get properties() {
    return {
      employeeList: {
        type: Array,
        value: [],
        notify: true
      },
      editingIndex: {
        type: Number,
        value: -1,
        notify: true
      }
    };
  }

}

window.customElements.define("to-do", ToDo);
