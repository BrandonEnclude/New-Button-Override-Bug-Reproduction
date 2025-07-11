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
  backgroundContextUrl = "";
  decodedContext = {};

  @wire(CurrentPageReference)
  async wiredPageRef(ref) {
    this.pageRef = ref;
    this.decodedContext = decodeContext(ref);
    this.backgroundContextUrl = await this.generatebackgroundContextUrl();
  }

  get objectApiName() {
    return this?.pageRef?.attributes.objectApiName || "";
  }

  get actionName() {
    return this?.pageRef?.attributes.actionName || "";
  }

  get recordTypeId() {
    return this?.pageRef?.state?.recordTypeId || "";
  }

  get inContextOfRef() {
    return this.pageRef?.state?.inContextOfRef || "";
  }

  get additionalParams() {
    return this.pageRef?.state?.additionalParams || "";
  }

  get inContextOfObject() {
    return this.decodedContext?.attributes?.objectApiName || "";
  }

  get inContextOfRecordId() {
    return this.decodedContext?.attributes?.recordId || null;
  }

  get navigationLocation() {
    return this.decodedContext?.attributes?.actionName === "view"
      ? "RELATED_LIST"
      : "LIST_VIEW";
  }

}