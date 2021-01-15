import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BooksDictionariesService} from '../../services/books-dictionaries.service';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss']
})
export class BookModalComponent implements OnInit{

  modalData: any;
  form: FormGroup;
  categories$: Observable<any>;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _activeModal: NgbActiveModal,
    private readonly _booksDictionariesService: BooksDictionariesService
  ) {
  }

  ngOnInit(): void {
    this._createForm();
    this.categories$ = this._booksDictionariesService.getCategories()
  }

  dismiss(): void {
    this._activeModal.dismiss();
  }

  save(): void {
    this._activeModal.close(this.form.getRawValue());
  }

  private _createForm() {
    this.form = this._fb.group({
      name: [this.modalData?.name ?? null, [Validators.required]],
      isbn: [this.modalData?.isbn ?? null, [Validators.required]],
      categories: [this.modalData?.categories.map((item: any) => item.id) ?? null]
    });
  }
}