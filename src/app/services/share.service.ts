import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private socialSharing: SocialSharing) { }

  share(name: string) {
      this.shareViaOptions();
  }

    shareViaOptions() {
        const options = {
            message: 'kom ook pokemon vangen joh!',
            subject: 'Please select any social media to share.',
            chooserTitle: 'SHARE' // Android only, you can override the default share sheet title
        }


        this.socialSharing.shareWithOptions(options).then((res) => {
            console.log('Success!');
        }).catch(() => {
            console.log('Error!');
        });
    }

}
