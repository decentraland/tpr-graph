// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class ThirdParty extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("managers", Value.fromStringArray(new Array(0)));
    this.set("rawMetadata", Value.fromString(""));
    this.set("resolver", Value.fromString(""));
    this.set("isApproved", Value.fromBoolean(false));
    this.set("maxItems", Value.fromBigInt(BigInt.zero()));
    this.set("totalItems", Value.fromBigInt(BigInt.zero()));
    this.set("metadata", Value.fromString(""));
    this.set("root", Value.fromString(""));
    this.set("consumedSlots", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ThirdParty entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save ThirdParty entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("ThirdParty", id.toString(), this);
    }
  }

  static load(id: string): ThirdParty | null {
    return changetype<ThirdParty | null>(store.get("ThirdParty", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get managers(): Array<string> {
    let value = this.get("managers");
    return value!.toStringArray();
  }

  set managers(value: Array<string>) {
    this.set("managers", Value.fromStringArray(value));
  }

  get rawMetadata(): string {
    let value = this.get("rawMetadata");
    return value!.toString();
  }

  set rawMetadata(value: string) {
    this.set("rawMetadata", Value.fromString(value));
  }

  get resolver(): string {
    let value = this.get("resolver");
    return value!.toString();
  }

  set resolver(value: string) {
    this.set("resolver", Value.fromString(value));
  }

  get isApproved(): boolean {
    let value = this.get("isApproved");
    return value!.toBoolean();
  }

  set isApproved(value: boolean) {
    this.set("isApproved", Value.fromBoolean(value));
  }

  get maxItems(): BigInt {
    let value = this.get("maxItems");
    return value!.toBigInt();
  }

  set maxItems(value: BigInt) {
    this.set("maxItems", Value.fromBigInt(value));
  }

  get totalItems(): BigInt {
    let value = this.get("totalItems");
    return value!.toBigInt();
  }

  set totalItems(value: BigInt) {
    this.set("totalItems", Value.fromBigInt(value));
  }

  get items(): Array<string> | null {
    let value = this.get("items");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set items(value: Array<string> | null) {
    if (!value) {
      this.unset("items");
    } else {
      this.set("items", Value.fromStringArray(<Array<string>>value));
    }
  }

  get metadata(): string {
    let value = this.get("metadata");
    return value!.toString();
  }

  set metadata(value: string) {
    this.set("metadata", Value.fromString(value));
  }

  get root(): string {
    let value = this.get("root");
    return value!.toString();
  }

  set root(value: string) {
    this.set("root", Value.fromString(value));
  }

  get consumedSlots(): BigInt {
    let value = this.get("consumedSlots");
    return value!.toBigInt();
  }

  set consumedSlots(value: BigInt) {
    this.set("consumedSlots", Value.fromBigInt(value));
  }

  get searchName(): string | null {
    let value = this.get("searchName");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set searchName(value: string | null) {
    if (!value) {
      this.unset("searchName");
    } else {
      this.set("searchName", Value.fromString(<string>value));
    }
  }

  get searchDescription(): string | null {
    let value = this.get("searchDescription");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set searchDescription(value: string | null) {
    if (!value) {
      this.unset("searchDescription");
    } else {
      this.set("searchDescription", Value.fromString(<string>value));
    }
  }

  get searchText(): string | null {
    let value = this.get("searchText");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set searchText(value: string | null) {
    if (!value) {
      this.unset("searchText");
    } else {
      this.set("searchText", Value.fromString(<string>value));
    }
  }
}

export class Curation extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("qty", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Curation entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Curation entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Curation", id.toString(), this);
    }
  }

  static load(id: string): Curation | null {
    return changetype<Curation | null>(store.get("Curation", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get qty(): BigInt {
    let value = this.get("qty");
    return value!.toBigInt();
  }

  set qty(value: BigInt) {
    this.set("qty", Value.fromBigInt(value));
  }

  get receipts(): Array<string> | null {
    let value = this.get("receipts");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set receipts(value: Array<string> | null) {
    if (!value) {
      this.unset("receipts");
    } else {
      this.set("receipts", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class Receipt extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("thirdParty", Value.fromString(""));
    this.set("curation", Value.fromString(""));
    this.set("qty", Value.fromBigInt(BigInt.zero()));
    this.set("signer", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Receipt entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Receipt entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Receipt", id.toString(), this);
    }
  }

  static load(id: string): Receipt | null {
    return changetype<Receipt | null>(store.get("Receipt", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get thirdParty(): string {
    let value = this.get("thirdParty");
    return value!.toString();
  }

  set thirdParty(value: string) {
    this.set("thirdParty", Value.fromString(value));
  }

  get curation(): string {
    let value = this.get("curation");
    return value!.toString();
  }

  set curation(value: string) {
    this.set("curation", Value.fromString(value));
  }

  get qty(): BigInt {
    let value = this.get("qty");
    return value!.toBigInt();
  }

  set qty(value: BigInt) {
    this.set("qty", Value.fromBigInt(value));
  }

  get signer(): string {
    let value = this.get("signer");
    return value!.toString();
  }

  set signer(value: string) {
    this.set("signer", Value.fromString(value));
  }
}

export class Item extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("urn", Value.fromString(""));
    this.set("blockchainItemId", Value.fromString(""));
    this.set("metadata", Value.fromString(""));
    this.set("rawMetadata", Value.fromString(""));
    this.set("isApproved", Value.fromBoolean(false));
    this.set("thirdParty", Value.fromString(""));
    this.set("reviewedAt", Value.fromBigInt(BigInt.zero()));
    this.set("createdAt", Value.fromBigInt(BigInt.zero()));
    this.set("updatedAt", Value.fromBigInt(BigInt.zero()));
    this.set("searchThirdPartyId", Value.fromString(""));
    this.set("searchItemId", Value.fromString(""));
    this.set("searchCollectionId", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Item entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Item entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Item", id.toString(), this);
    }
  }

  static load(id: string): Item | null {
    return changetype<Item | null>(store.get("Item", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get urn(): string {
    let value = this.get("urn");
    return value!.toString();
  }

  set urn(value: string) {
    this.set("urn", Value.fromString(value));
  }

  get blockchainItemId(): string {
    let value = this.get("blockchainItemId");
    return value!.toString();
  }

  set blockchainItemId(value: string) {
    this.set("blockchainItemId", Value.fromString(value));
  }

  get metadata(): string {
    let value = this.get("metadata");
    return value!.toString();
  }

  set metadata(value: string) {
    this.set("metadata", Value.fromString(value));
  }

  get rawMetadata(): string {
    let value = this.get("rawMetadata");
    return value!.toString();
  }

  set rawMetadata(value: string) {
    this.set("rawMetadata", Value.fromString(value));
  }

  get isApproved(): boolean {
    let value = this.get("isApproved");
    return value!.toBoolean();
  }

  set isApproved(value: boolean) {
    this.set("isApproved", Value.fromBoolean(value));
  }

  get thirdParty(): string {
    let value = this.get("thirdParty");
    return value!.toString();
  }

  set thirdParty(value: string) {
    this.set("thirdParty", Value.fromString(value));
  }

  get contentHash(): string | null {
    let value = this.get("contentHash");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set contentHash(value: string | null) {
    if (!value) {
      this.unset("contentHash");
    } else {
      this.set("contentHash", Value.fromString(<string>value));
    }
  }

  get reviewedAt(): BigInt {
    let value = this.get("reviewedAt");
    return value!.toBigInt();
  }

  set reviewedAt(value: BigInt) {
    this.set("reviewedAt", Value.fromBigInt(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    return value!.toBigInt();
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }

  get updatedAt(): BigInt {
    let value = this.get("updatedAt");
    return value!.toBigInt();
  }

  set updatedAt(value: BigInt) {
    this.set("updatedAt", Value.fromBigInt(value));
  }

  get searchThirdPartyId(): string {
    let value = this.get("searchThirdPartyId");
    return value!.toString();
  }

  set searchThirdPartyId(value: string) {
    this.set("searchThirdPartyId", Value.fromString(value));
  }

  get searchItemId(): string {
    let value = this.get("searchItemId");
    return value!.toString();
  }

  set searchItemId(value: string) {
    this.set("searchItemId", Value.fromString(value));
  }

  get searchCollectionId(): string {
    let value = this.get("searchCollectionId");
    return value!.toString();
  }

  set searchCollectionId(value: string) {
    this.set("searchCollectionId", Value.fromString(value));
  }

  get searchText(): string | null {
    let value = this.get("searchText");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set searchText(value: string | null) {
    if (!value) {
      this.unset("searchText");
    } else {
      this.set("searchText", Value.fromString(<string>value));
    }
  }

  get searchName(): string | null {
    let value = this.get("searchName");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set searchName(value: string | null) {
    if (!value) {
      this.unset("searchName");
    } else {
      this.set("searchName", Value.fromString(<string>value));
    }
  }

  get searchDescription(): string | null {
    let value = this.get("searchDescription");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set searchDescription(value: string | null) {
    if (!value) {
      this.unset("searchDescription");
    } else {
      this.set("searchDescription", Value.fromString(<string>value));
    }
  }

  get searchWearableCategory(): string | null {
    let value = this.get("searchWearableCategory");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set searchWearableCategory(value: string | null) {
    if (!value) {
      this.unset("searchWearableCategory");
    } else {
      this.set("searchWearableCategory", Value.fromString(<string>value));
    }
  }

  get searchWearableBodyShapes(): Array<string> | null {
    let value = this.get("searchWearableBodyShapes");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set searchWearableBodyShapes(value: Array<string> | null) {
    if (!value) {
      this.unset("searchWearableBodyShapes");
    } else {
      this.set(
        "searchWearableBodyShapes",
        Value.fromStringArray(<Array<string>>value)
      );
    }
  }
}

export class Metadata extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("type", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Metadata entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Metadata entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Metadata", id.toString(), this);
    }
  }

  static load(id: string): Metadata | null {
    return changetype<Metadata | null>(store.get("Metadata", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get type(): string {
    let value = this.get("type");
    return value!.toString();
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }

  get thirdParty(): string | null {
    let value = this.get("thirdParty");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set thirdParty(value: string | null) {
    if (!value) {
      this.unset("thirdParty");
    } else {
      this.set("thirdParty", Value.fromString(<string>value));
    }
  }

  get itemWearable(): string | null {
    let value = this.get("itemWearable");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set itemWearable(value: string | null) {
    if (!value) {
      this.unset("itemWearable");
    } else {
      this.set("itemWearable", Value.fromString(<string>value));
    }
  }
}

export class ThirdPartyMetadata extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("name", Value.fromString(""));
    this.set("description", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ThirdPartyMetadata entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save ThirdPartyMetadata entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("ThirdPartyMetadata", id.toString(), this);
    }
  }

  static load(id: string): ThirdPartyMetadata | null {
    return changetype<ThirdPartyMetadata | null>(
      store.get("ThirdPartyMetadata", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get description(): string {
    let value = this.get("description");
    return value!.toString();
  }

  set description(value: string) {
    this.set("description", Value.fromString(value));
  }
}

export class ItemWearableMetadata extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("name", Value.fromString(""));
    this.set("description", Value.fromString(""));
    this.set("bodyShapes", Value.fromStringArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ItemWearableMetadata entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save ItemWearableMetadata entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("ItemWearableMetadata", id.toString(), this);
    }
  }

  static load(id: string): ItemWearableMetadata | null {
    return changetype<ItemWearableMetadata | null>(
      store.get("ItemWearableMetadata", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get description(): string {
    let value = this.get("description");
    return value!.toString();
  }

  set description(value: string) {
    this.set("description", Value.fromString(value));
  }

  get category(): string | null {
    let value = this.get("category");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set category(value: string | null) {
    if (!value) {
      this.unset("category");
    } else {
      this.set("category", Value.fromString(<string>value));
    }
  }

  get bodyShapes(): Array<string> {
    let value = this.get("bodyShapes");
    return value!.toStringArray();
  }

  set bodyShapes(value: Array<string>) {
    this.set("bodyShapes", Value.fromStringArray(value));
  }
}

export class Count extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("thirdPartyTotal", Value.fromBigInt(BigInt.zero()));
    this.set("itemTotal", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Count entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Count entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Count", id.toString(), this);
    }
  }

  static load(id: string): Count | null {
    return changetype<Count | null>(store.get("Count", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get thirdPartyTotal(): BigInt {
    let value = this.get("thirdPartyTotal");
    return value!.toBigInt();
  }

  set thirdPartyTotal(value: BigInt) {
    this.set("thirdPartyTotal", Value.fromBigInt(value));
  }

  get itemTotal(): BigInt {
    let value = this.get("itemTotal");
    return value!.toBigInt();
  }

  set itemTotal(value: BigInt) {
    this.set("itemTotal", Value.fromBigInt(value));
  }
}
