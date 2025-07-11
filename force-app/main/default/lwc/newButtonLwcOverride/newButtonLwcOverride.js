import { LightningElement, wire } from "lwc";
import { NavigationMixin, CurrentPageReference } from "lightning/navigation";

/** @param {PageReference} ref */
const decodeContext = (ref) => {
  try {
    return JSON.parse(atob(ref.state.inContextOfRef.split(".")[1]));
  } catch (err) {
    console.error(JSON.stringify(err));
    return null;
  }
};

export default class NewButtonLwcOverride extends NavigationMixin(
  LightningElement
) {
  pageRef;
  decodedContext = {};

  @wire(CurrentPageReference)
  async wiredPageRef(ref) {
    this.pageRef = ref;
    this.decodedContext = decodeContext(ref);
  }

  get debugInfo() {
    return JSON.stringify({
        pageRef: this.pageRef,
        decodedContext: this.decodedContext
    }, null, 2)
  }

}