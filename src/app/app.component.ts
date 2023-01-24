import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'TestAngular';
  @ViewChild('tombol', { static: true, read: ElementRef }) public tombol!: ElementRef<HTMLButtonElement>;
  @ViewChild('buttonIcon', { static: true, read: ElementRef }) public buttonIcon!: ElementRef<HTMLButtonElement>;
  @ViewChild('buttonText', { static: true, read: ElementRef }) public buttonText!: ElementRef<HTMLButtonElement>;

  private unlistenerTombol!: () => void;

  constructor(private _renderer: Renderer2) {

  }

  public ngOnInit(): void {
    this.onPlayAnimation();
  }

  public ngOnDestroy(): void {
    this.unlistenerTombol();
  }

  public ngAfterViewInit() {

  }

  public onPlayAnimation() {
    this.unlistenerTombol = this._renderer.listen(this.tombol.nativeElement, 'click', (event: MouseEvent) => {
      console.log('tttt');
      this._renderer.setStyle(this.buttonText.nativeElement, 'animation', 'buttonSendTextAnimation ease-in-out 3s');
      this._renderer.setStyle(this.buttonIcon.nativeElement, 'animation', 'buttonIconAnimation ease-in 3s');
      this._renderer.setProperty(this.tombol.nativeElement, 'disabled', true);

      setTimeout(() => {
        this._renderer.setProperty(this.buttonText.nativeElement, 'innerHTML', 'Sending...');
      }, 250);

      setTimeout(() => {
        this._renderer.setProperty(this.buttonText.nativeElement, 'innerHTML', '');
        this._renderer.setProperty(this.buttonIcon.nativeElement, 'innerHTML', "check");
        this._renderer.setStyle(this.buttonIcon.nativeElement, 'fontWeight', "bold");
      }, 1500);

      setTimeout(() => {
        this._renderer.setStyle(this.tombol.nativeElement, 'style', 'backgroundColor = "#7240DE"');
        this._renderer.setStyle(this.tombol.nativeElement, 'style', 'color, "#f8f8f8"');
        this._renderer.setStyle(this.tombol.nativeElement, 'style', 'boxShadow, "0 1rem 2.5rem -1rem rgba(114, 64, 222, .5)"');
      }, 1800);

      setTimeout(() => {
        this._renderer.setStyle(this.buttonText.nativeElement, 'animation', "none");
        this._renderer.setStyle(this.buttonIcon.nativeElement, 'animation', "none");
        this._renderer.setProperty(this.tombol.nativeElement, 'disabled', false);
        this._renderer.setProperty(this.buttonText.nativeElement, 'innerHTML', "Send message");
        this._renderer.setProperty(this.buttonIcon, 'innerHTML', "send");
        this._renderer.setStyle(this.tombol.nativeElement, 'backgroundColor', "#27272b");
        this._renderer.setStyle(this.tombol.nativeElement, 'color', "#f8f8f8");
        this._renderer.setStyle(this.tombol.nativeElement, 'boxShadow', "0 1rem 2.5rem -1rem rgba(0, 0, 0, 0.25)");
      }, 5 * 1000);
    });
  }
}
