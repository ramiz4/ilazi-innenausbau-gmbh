import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SafeHtmlPipe],
    });
    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new SafeHtmlPipe(sanitizer);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return undefined for null input', () => {
    const result = pipe.transform(null as any);
    expect(result).toBeUndefined();
  });

  it('should return undefined for undefined input', () => {
    const result = pipe.transform(undefined);
    expect(result).toBeUndefined();
  });

  it('should return undefined for empty string', () => {
    const result = pipe.transform('');
    expect(result).toBeUndefined();
  });

  it('should return SafeHtml for valid HTML string', () => {
    const htmlString = '<p>Hello World</p>';
    const result = pipe.transform(htmlString);

    expect(result).toBeTruthy();
    expect(result).toBe(sanitizer.bypassSecurityTrustHtml(htmlString));
  });

  it('should handle complex HTML with attributes', () => {
    const complexHtml =
      '<div class="test"><p style="color: red;">Styled text</p><a href="https://example.com">Link</a></div>';
    const result = pipe.transform(complexHtml);

    expect(result).toBeTruthy();
    expect(result).toBe(sanitizer.bypassSecurityTrustHtml(complexHtml));
  });

  it('should handle HTML with special characters', () => {
    const htmlWithSpecialChars =
      '<p>Hello &amp; welcome! &lt;script&gt;alert("test")&lt;/script&gt;</p>';
    const result = pipe.transform(htmlWithSpecialChars);

    expect(result).toBeTruthy();
    expect(result).toBe(
      sanitizer.bypassSecurityTrustHtml(htmlWithSpecialChars)
    );
  });

  it('should handle plain text input', () => {
    const plainText = 'Just plain text without HTML';
    const result = pipe.transform(plainText);

    expect(result).toBeTruthy();
    expect(result).toBe(sanitizer.bypassSecurityTrustHtml(plainText));
  });

  it('should handle whitespace-only strings', () => {
    const whitespaceString = '   ';
    const result = pipe.transform(whitespaceString);

    expect(result).toBeTruthy();
    expect(result).toBe(sanitizer.bypassSecurityTrustHtml(whitespaceString));
  });

  it('should handle HTML with line breaks', () => {
    const htmlWithLineBreaks = `<div>
      <p>First paragraph</p>
      <p>Second paragraph</p>
    </div>`;
    const result = pipe.transform(htmlWithLineBreaks);

    expect(result).toBeTruthy();
    expect(result).toBe(sanitizer.bypassSecurityTrustHtml(htmlWithLineBreaks));
  });

  it('should call DomSanitizer.bypassSecurityTrustHtml with the correct value', () => {
    const testHtml = '<span>Test content</span>';
    const bypassSpy = spyOn(
      sanitizer,
      'bypassSecurityTrustHtml'
    ).and.callThrough();

    pipe.transform(testHtml);

    expect(bypassSpy).toHaveBeenCalledWith(testHtml);
    expect(bypassSpy).toHaveBeenCalledTimes(1);
  });

  it('should not call DomSanitizer.bypassSecurityTrustHtml for falsy values', () => {
    const bypassSpy = spyOn(
      sanitizer,
      'bypassSecurityTrustHtml'
    ).and.callThrough();

    pipe.transform(undefined);
    pipe.transform('');
    pipe.transform(null as any);

    expect(bypassSpy).not.toHaveBeenCalled();
  });
});
