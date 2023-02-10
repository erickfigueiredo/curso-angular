import { Component, OnInit, OnChanges, Input, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
})
export class ServerElementComponent implements OnInit, OnChanges {
  // Expose this property to parent elements
  @Input('srvElement')
  element: { type: string; name: string; content: string };

  constructor() {
    console.log('Constructor called!')
  }

  ngOnChanges(changes: SimpleChanges):void{
    console.log('ngOnChnages called!')
    console.log(changes)
  }

  ngOnInit(): void {
    console.log('ngOnInit called!')
  }
}
