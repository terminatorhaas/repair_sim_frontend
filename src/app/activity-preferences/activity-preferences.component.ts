import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { MatChip, MatChipList } from '@angular/material/chips';



@Component({
  selector: 'app-activity-preferences',
  templateUrl: './activity-preferences.component.html',
  styleUrls: ['./activity-preferences.component.css']
})
export class ActivityPreferencesComponent implements OnInit, ControlValueAccessor {

  
  @Input() options: string[] = [];
  
  toggleSelection(chip: MatChip) {
    chip.toggleSelected();
 }
  constructor() { }

 
  
  onChange!: (value: string[]) => void;
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
  propagateChange(value: string[]) {
    if (this.onChange) {
      this.onChange(value);
    }
}

@ViewChild(MatChipList)
 chipList!: MatChipList;
value: string[] = [];

writeValue(value: string[]): void {
    // When form value set when chips list initialized
    if (this.chipList && value) {
      this.selectChips(value);
    } else if (value) {
      // When chips not initialized
      this.value = value;
    }
}

selectChips(value: string[]) {
    this.chipList.chips.forEach((chip) => chip.deselect());

    const chipsToSelect = this.chipList.chips.filter((c) =>
      value.includes(c.value)
    );

    chipsToSelect.forEach((chip) => chip.select());
  }

  ngAfterViewInit() {
    this.selectChips(this.value);

    this.chipList.chipSelectionChanges
      .pipe(
        untilDestroyed(this),
        map((event) => event.source))
      .subscribe((chip) => {
        if (chip.selected) {
          this.value = [...this.value, chip.value];
        } else {
          this.value = this.value.filter((o) => o !== chip.value);
        }

        this.propagateChange(this.value);
      });
  }

  ngOnInit(): void {
  }

}


