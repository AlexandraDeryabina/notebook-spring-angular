import { Component, OnInit } from '@angular/core';
import {Notebook} from "../model/Notebook";
import {NotePriority} from "../enum/NotePriority.enum";
import {NotebookService} from "../service/notebook.service";
import {ActionType} from "../enum/ActionType.enum";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {isEmpty} from 'lodash';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  private action: ActionType;
  private id: number;
  model : Notebook = new Notebook();
  private loading = false;
  submitted = false;
  priorities = [NotePriority.HIGH, NotePriority.NORMAL, NotePriority.LOW];
  // private priorities = Object.values(NotePriority);

  constructor(
    private notebookService: NotebookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.action = ActionType.valueOf(this.route.snapshot.paramMap.get('action'));
    if (this.action === ActionType.NEW) {
      this.initCard();
    } else {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      this.loadCard();
    }
  }

  initCard() {

  }

  loadCard() {
    this.loading = true;
    this.notebookService.loadById(this.id).subscribe((response: Notebook) => {
        this.model = response;
        this.loading = false
      },
      error => {
        alert(error)
      });
  }

  onSubmit() {
    this.notebookService.save(this.model).subscribe(
      () => {
        this.submitted = true;
        this.router.navigate([]).then(result => window.open(environment.apiUrl,'_self'));
      },
      error => {
        alert(error);
      }
    );
  }

  private clear(field: string): void {
    if (!isEmpty(field)) {
      this.model[field] = null
    }
  }
}
