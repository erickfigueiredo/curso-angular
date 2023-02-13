import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ViewChild,
  ElementRef,
  ContentChild
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
})
export class ServerElementComponent implements
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {
  // Expose this property to parent elements
  @Input('srvElement')
  element: { type: string; name: string; content: string };

  @Input() name: string;

  @ViewChild('heading', { static: true }) header: ElementRef;
  @ContentChild('contentParagraph', {static: true}) contentParagraph: ElementRef;

  constructor() {
    console.log('Constructor called!')
  }
  ngAfterContentInit() {
    // Conteudo passado para o componente, executado uma unica vez
    console.log('ngAfterContentInit called!')
    console.log('Text content of Paragraph ' + this.contentParagraph.nativeElement.textContent)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called!')
    console.log(changes)
  }

  ngOnInit(): void {
    console.log('ngOnInit called!')
    console.log('Text content ' + this.header.nativeElement.textContent)
    console.log('Text content of Paragraph ' + this.contentParagraph.nativeElement.textContent)
  }

  ngDoCheck() {
    console.log('ngDoCheck Called')
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called')
  }

  // Só aqui conseguimos acessar o conteudo dos elementos do dom
  ngAfterViewInit() {
    console.log('ngAfterViewInit called!')
    console.log('Text content ' + this.header.nativeElement.textContent)
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked called')
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called!')
  }

}
