import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BarcodeScanner } from "nativescript-barcodescanner";
import { registerElement } from "nativescript-angular/element-registry";
import { Promotion, convertToPromotion } from '~/app/shared/promotion';
import { PromotionsService } from '~/app/services/promotions.service';
import { firestore } from 'nativescript-plugin-firebase';

registerElement(
  'Fab',
  () => require('@nstudio/nativescript-floatingactionbutton').Fab
);
@Component({
  selector: 'ns-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss'],
  moduleId: module.id
})
export class QrcodeComponent{

  barcodescanner: any;
  errMess : string
  @Output() scanned = new EventEmitter<string>();


  constructor(private promotionsServices : PromotionsService) {
  }

  
  private scanTmp() {
    console.log("SCAn temp")
    var url = "https://google.fr";
    this.scanned.emit("albacio");
  }

  private showCurrentPromotionOfShopID(idOfRestaurant : string) : void {
    this.promotionsServices.getCurrentPromotionOfShop(idOfRestaurant).then((doc : firestore.DocumentSnapshot) => {

      if(doc.exists) {
        let promo : Promotion = convertToPromotion(doc.data())
        this.tellUserPromotion(promo);
      } else {
        // Promotion doesn't exist
        this.tellUserUnavailablePromotion();
      }
    });
  }

  private tellUserPromotion(promotion : Promotion) {
    alert({
      title: "Promotion",
      message: promotion.text + "\n",
      okButtonText: "Thanks!"
    });
  }

  private tellUserUnavailablePromotion() : void {
    alert({
      title: "Promotion",
      message: "Promotion unavailable\n",
      okButtonText: "OK"
    });
  }

  public onScanResult(scanResult: any) {
    console.log(`onScanResult: ${scanResult.text} (${scanResult.format})`);

    
  }

  public doCheckAvailable() {
    new BarcodeScanner().available().then(avail => {
      alert({
        title: "Scanning available?",
        message: avail ? "YES" : "NO",
        okButtonText: "OK"
      });
    }, (err) => {
      alert(err);
    });
  }

  public doCheckHasCameraPermission() {
    new BarcodeScanner().hasCameraPermission().then(permitted => {
      alert({
        title: "Has Camera permission?",
        message: permitted ? "YES" : "NO",
        okButtonText: "OK"
      });
    }, (err) => {
      alert(err);
    });
  }

  public doRequestCameraPermission() {
    new BarcodeScanner().requestCameraPermission()
        .then(() => console.log("Camera permission granted"))
        .catch(() => console.log("Camera permission not granted"));
  }

  public doScanWithBackCamera() {
    this.scan(false, true);
  }

  public doScanWithFrontCamera() {
    this.scan(true, false);
  }

  public doScanWithTorch() {
    this.scan(false, true, true, "portrait");
  }

  public doScanPortrait() {
    this.scan(false, true, false, "portrait");
  }

  public doScanLandscape() {
    this.scan(false, true, false, "landscape");
  }

  public doContinuousScan() {
    new BarcodeScanner().scan({
      reportDuplicates: true,
      continuousScanCallback: function (result) {
        console.log(`${result.format}: ${result.text} @ ${new Date().getTime()}`);
      },
      closeCallback: () => {
        console.log("Scanner closed @ " + new Date().getTime());
      }
    });
  }


  private scan(front: boolean, flip: boolean, torch?: boolean, orientation?: string) {
    new BarcodeScanner().scan({
      presentInRootViewController: true, // not needed here, but added it just for show
      cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
      cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
      message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
      preferFrontCamera: front,     // Android only, default false
      showFlipCameraButton: flip,   // default false
      showTorchButton: torch,       // iOS only, default false
      torchOn: false,               // launch with the flashlight on (default false)
      resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
      orientation: orientation,     // Android only, default undefined (sensor-driven orientation), other options: portrait|landscape
      beepOnScan: true,             // Play or Suppress beep on scan (default true)
      fullScreen: true,             // iOS 13+ modal appearance changed so they can be swiped down when this is false (default false)
      openSettingsIfPermissionWasPreviouslyDenied: true, // On iOS you can send the user to the settings app if access was previously denied
      closeCallback: () => {
        console.log("Scanner closed @ " + new Date().getTime());
      }
    }).then(
        (result) => {
          console.log("--- scanned: " + result.text);

          this.showCurrentPromotionOfShopID(result.text);

          // Note that this Promise is never invoked when a 'continuousScanCallback' function is provided
          setTimeout(function () {
            // if this alert doesn't show up please upgrade to {N} 2.4.0+
            
          }, 500);
        },
        function (errorMessage) {
          console.log("No scan. " + errorMessage);
        }
    );
  }

}
