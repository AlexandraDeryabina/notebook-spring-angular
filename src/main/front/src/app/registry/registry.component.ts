import { Component, OnInit } from "@angular/core";
import {Notebook} from "../model/Notebook";
import {NotebookService} from "../service/notebook.service";
import * as _ from 'lodash';
import * as moment from 'moment';
import {NotePriority} from "../enum/NotePriority.enum";
import {Router} from "@angular/router";
import {ActionType} from "../enum/ActionType.enum";


@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})

export class RegistryComponent implements OnInit {


  notebook: Notebook[];
  loading = false;
  cols = [
    {
      field: 'id',
      header: 'Номер',

    },
    {
      field: 'headline',
      header: 'Тема'
    },
    {
      field: 'text',
      header: 'Текст записи'
    },
    {
      field: 'priority',
      header: 'Срочность',
      templateIsHtml: true,
      template: rowData => `<span>${_.isNil(NotePriority[rowData.priority].label) ? '' : NotePriority[rowData.priority].label}</span>`
    },
    {
      field: 'deadline',
      header: 'Дедлайн',
      templateIsHtml: true,
      template: rowData => `<span>${moment(rowData.deadline).isValid() ? moment(rowData.deadline).format('DD.MM.YYYY HH:mm:ss') : ''}</span>`
    },
    {
      field: 'deleteFunction',
      header: 'Удалить запись'
    },
    {
      field: 'editFunction',
      header: 'Открыть запись'
    },
  ];

  constructor(
    private router: Router,
    private notebookService: NotebookService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.notebookService.load().subscribe((response: Notebook[]) => {
        this.notebook = response;
        this.loading = false;
      },
      error => {
        alert(error);
      });
  }

  edit(notebook: Notebook) {
    this.router.navigate([]).then(result => window.open('#/CARD/' + ActionType.EDIT.value + '/' + notebook.id, '_self'));
  }

  editById(id: number) {
    this.router.navigate([]).then(result => window.open('#/CARD/' + ActionType.EDIT.value + '/' + id, '_self'));
  }

  add() {
    this.router.navigate([]).then(result => window.open('#/CARD/' + ActionType.NEW.value, '_self'));
  }

  deleteRow(id: number) {
    this.notebookService.delete(id).subscribe(
      () => {
        this.notebook = this.notebook.filter(note => id != note.id);
      },
      error => {
        alert(error);
      }
    )
  }
}
