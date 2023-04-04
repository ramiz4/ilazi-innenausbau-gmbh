import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent {
  images = [
    'https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=MnwyNjI5NjF8MHwxfHNlYXJjaHwzfHxDb25zdHJ1Y3Rpb258ZW58MHx8fHwxNjgwNTU5MzMz&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1080',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=MnwyNjI5NjF8MHwxfHNlYXJjaHwxOXx8Q29uc3RydWN0aW9ufGVufDB8fHx8MTY4MDU1OTMzMw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1080',
    'https://images.unsplash.com/photo-1503387837-b154d5074bd2?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=MnwyNjI5NjF8MHwxfHNlYXJjaHwyMHx8Q29uc3RydWN0aW9ufGVufDB8fHx8MTY4MDU1OTMzMw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1080',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=MnwyNjI5NjF8MHwxfHNlYXJjaHwxfHxDb25zdHJ1Y3Rpb258ZW58MHx8fHwxNjgwNTU5MzMz&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1080',
    'https://images.unsplash.com/photo-1542621334-a254cf47733d?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=MnwyNjI5NjF8MHwxfHNlYXJjaHwxOHx8Q29uc3RydWN0aW9ufGVufDB8fHx8MTY4MDU1OTMzMw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1080',
    'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=MnwyNjI5NjF8MHwxfHNlYXJjaHwyMnx8Q29uc3RydWN0aW9ufGVufDB8fHx8MTY4MDU1OTMzMw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1080'
  ]
}
