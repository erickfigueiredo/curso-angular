import { Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') itemName: ElementRef;
  @ViewChild('amountInput') itemAmount: ElementRef;
  @Output()ingredientAdded = new EventEmitter<Ingredient>();

  onAddItem() {
    this.ingredientAdded.emit(
      new Ingredient(
        this.itemName.nativeElement.value,
        this.itemAmount.nativeElement.value
      )
    );
  }
}
