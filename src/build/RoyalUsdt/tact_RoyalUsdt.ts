import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(8);
    let _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(32);
    let _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type BuySpin = {
    $$type: 'BuySpin';
    amount: bigint;
}

export function storeBuySpin(src: BuySpin) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3479065657, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadBuySpin(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3479065657) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'BuySpin' as const, amount: _amount };
}

function loadTupleBuySpin(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'BuySpin' as const, amount: _amount };
}

function loadGetterTupleBuySpin(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'BuySpin' as const, amount: _amount };
}

function storeTupleBuySpin(source: BuySpin) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserBuySpin(): DictionaryValue<BuySpin> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBuySpin(src)).endCell());
        },
        parse: (src) => {
            return loadBuySpin(src.loadRef().beginParse());
        }
    }
}

export type ChangeAdmin = {
    $$type: 'ChangeAdmin';
    newOwner: Address;
}

export function storeChangeAdmin(src: ChangeAdmin) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(636739454, 32);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeAdmin(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 636739454) { throw Error('Invalid prefix'); }
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeAdmin' as const, newOwner: _newOwner };
}

function loadTupleChangeAdmin(source: TupleReader) {
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeAdmin' as const, newOwner: _newOwner };
}

function loadGetterTupleChangeAdmin(source: TupleReader) {
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeAdmin' as const, newOwner: _newOwner };
}

function storeTupleChangeAdmin(source: ChangeAdmin) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeAdmin(): DictionaryValue<ChangeAdmin> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeAdmin(src)).endCell());
        },
        parse: (src) => {
            return loadChangeAdmin(src.loadRef().beginParse());
        }
    }
}

export type ClaimWinnings = {
    $$type: 'ClaimWinnings';
    amount: bigint;
    to: Address;
}

export function storeClaimWinnings(src: ClaimWinnings) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1012044212, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.to);
    };
}

export function loadClaimWinnings(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1012044212) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _to = sc_0.loadAddress();
    return { $$type: 'ClaimWinnings' as const, amount: _amount, to: _to };
}

function loadTupleClaimWinnings(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'ClaimWinnings' as const, amount: _amount, to: _to };
}

function loadGetterTupleClaimWinnings(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'ClaimWinnings' as const, amount: _amount, to: _to };
}

function storeTupleClaimWinnings(source: ClaimWinnings) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.to);
    return builder.build();
}

function dictValueParserClaimWinnings(): DictionaryValue<ClaimWinnings> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaimWinnings(src)).endCell());
        },
        parse: (src) => {
            return loadClaimWinnings(src.loadRef().beginParse());
        }
    }
}

export type TransferReward = {
    $$type: 'TransferReward';
    amount: bigint;
    to: Address;
}

export function storeTransferReward(src: TransferReward) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2815672846, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.to);
    };
}

export function loadTransferReward(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2815672846) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    let _to = sc_0.loadAddress();
    return { $$type: 'TransferReward' as const, amount: _amount, to: _to };
}

function loadTupleTransferReward(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'TransferReward' as const, amount: _amount, to: _to };
}

function loadGetterTupleTransferReward(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'TransferReward' as const, amount: _amount, to: _to };
}

function storeTupleTransferReward(source: TransferReward) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.to);
    return builder.build();
}

function dictValueParserTransferReward(): DictionaryValue<TransferReward> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransferReward(src)).endCell());
        },
        parse: (src) => {
            return loadTransferReward(src.loadRef().beginParse());
        }
    }
}

export type Withdraw = {
    $$type: 'Withdraw';
    amount: bigint;
    recipient: Address;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2856211534, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.recipient);
    };
}

export function loadWithdraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2856211534) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _recipient = sc_0.loadAddress();
    return { $$type: 'Withdraw' as const, amount: _amount, recipient: _recipient };
}

function loadTupleWithdraw(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _recipient = source.readAddress();
    return { $$type: 'Withdraw' as const, amount: _amount, recipient: _recipient };
}

function loadGetterTupleWithdraw(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _recipient = source.readAddress();
    return { $$type: 'Withdraw' as const, amount: _amount, recipient: _recipient };
}

function storeTupleWithdraw(source: Withdraw) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.recipient);
    return builder.build();
}

function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
        }
    }
}

export type TransferEvent = {
    $$type: 'TransferEvent';
    amount: bigint;
    recipient: Address;
}

export function storeTransferEvent(src: TransferEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(772744475, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.recipient);
    };
}

export function loadTransferEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 772744475) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _recipient = sc_0.loadAddress();
    return { $$type: 'TransferEvent' as const, amount: _amount, recipient: _recipient };
}

function loadTupleTransferEvent(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _recipient = source.readAddress();
    return { $$type: 'TransferEvent' as const, amount: _amount, recipient: _recipient };
}

function loadGetterTupleTransferEvent(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _recipient = source.readAddress();
    return { $$type: 'TransferEvent' as const, amount: _amount, recipient: _recipient };
}

function storeTupleTransferEvent(source: TransferEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.recipient);
    return builder.build();
}

function dictValueParserTransferEvent(): DictionaryValue<TransferEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransferEvent(src)).endCell());
        },
        parse: (src) => {
            return loadTransferEvent(src.loadRef().beginParse());
        }
    }
}

export type SpinBuyEvent = {
    $$type: 'SpinBuyEvent';
    amount: bigint;
    sender: Address;
}

export function storeSpinBuyEvent(src: SpinBuyEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2481024384, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
    };
}

export function loadSpinBuyEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2481024384) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    return { $$type: 'SpinBuyEvent' as const, amount: _amount, sender: _sender };
}

function loadTupleSpinBuyEvent(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    return { $$type: 'SpinBuyEvent' as const, amount: _amount, sender: _sender };
}

function loadGetterTupleSpinBuyEvent(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    return { $$type: 'SpinBuyEvent' as const, amount: _amount, sender: _sender };
}

function storeTupleSpinBuyEvent(source: SpinBuyEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    return builder.build();
}

function dictValueParserSpinBuyEvent(): DictionaryValue<SpinBuyEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSpinBuyEvent(src)).endCell());
        },
        parse: (src) => {
            return loadSpinBuyEvent(src.loadRef().beginParse());
        }
    }
}

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    query_id: bigint;
    jetton_amount: bigint;
    to: Address;
    responseAddress: Address;
    customPayload: Cell;
    forward_ton_amount: bigint;
    forwardPayload: Cell;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeInt(src.query_id, 257);
        b_0.storeInt(src.jetton_amount, 257);
        b_0.storeAddress(src.to);
        let b_1 = new Builder();
        b_1.storeAddress(src.responseAddress);
        b_1.storeRef(src.customPayload);
        b_1.storeInt(src.forward_ton_amount, 257);
        b_1.storeRef(src.forwardPayload);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadIntBig(257);
    let _jetton_amount = sc_0.loadIntBig(257);
    let _to = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _responseAddress = sc_1.loadAddress();
    let _customPayload = sc_1.loadRef();
    let _forward_ton_amount = sc_1.loadIntBig(257);
    let _forwardPayload = sc_1.loadRef();
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, jetton_amount: _jetton_amount, to: _to, responseAddress: _responseAddress, customPayload: _customPayload, forward_ton_amount: _forward_ton_amount, forwardPayload: _forwardPayload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _jetton_amount = source.readBigNumber();
    let _to = source.readAddress();
    let _responseAddress = source.readAddress();
    let _customPayload = source.readCell();
    let _forward_ton_amount = source.readBigNumber();
    let _forwardPayload = source.readCell();
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, jetton_amount: _jetton_amount, to: _to, responseAddress: _responseAddress, customPayload: _customPayload, forward_ton_amount: _forward_ton_amount, forwardPayload: _forwardPayload };
}

function loadGetterTupleTokenTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _jetton_amount = source.readBigNumber();
    let _to = source.readAddress();
    let _responseAddress = source.readAddress();
    let _customPayload = source.readCell();
    let _forward_ton_amount = source.readBigNumber();
    let _forwardPayload = source.readCell();
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, jetton_amount: _jetton_amount, to: _to, responseAddress: _responseAddress, customPayload: _customPayload, forward_ton_amount: _forward_ton_amount, forwardPayload: _forwardPayload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.jetton_amount);
    builder.writeAddress(source.to);
    builder.writeAddress(source.responseAddress);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeCell(source.forwardPayload);
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    }
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    queryId: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Slice;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forward_payload = sc_0;
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadGetterTupleTokenNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenNotification(src.loadRef().beginParse());
        }
    }
}

export type RoyalUsdt$Data = {
    $$type: 'RoyalUsdt$Data';
    adminAddress: Address;
    arr: Dictionary<Address, boolean>;
    arrLength: bigint;
    arrStart: bigint;
}

export function storeRoyalUsdt$Data(src: RoyalUsdt$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.adminAddress);
        b_0.storeDict(src.arr, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        b_0.storeUint(src.arrLength, 8);
        b_0.storeUint(src.arrStart, 8);
    };
}

export function loadRoyalUsdt$Data(slice: Slice) {
    let sc_0 = slice;
    let _adminAddress = sc_0.loadAddress();
    let _arr = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_0);
    let _arrLength = sc_0.loadUintBig(8);
    let _arrStart = sc_0.loadUintBig(8);
    return { $$type: 'RoyalUsdt$Data' as const, adminAddress: _adminAddress, arr: _arr, arrLength: _arrLength, arrStart: _arrStart };
}

function loadTupleRoyalUsdt$Data(source: TupleReader) {
    let _adminAddress = source.readAddress();
    let _arr = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    let _arrLength = source.readBigNumber();
    let _arrStart = source.readBigNumber();
    return { $$type: 'RoyalUsdt$Data' as const, adminAddress: _adminAddress, arr: _arr, arrLength: _arrLength, arrStart: _arrStart };
}

function loadGetterTupleRoyalUsdt$Data(source: TupleReader) {
    let _adminAddress = source.readAddress();
    let _arr = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    let _arrLength = source.readBigNumber();
    let _arrStart = source.readBigNumber();
    return { $$type: 'RoyalUsdt$Data' as const, adminAddress: _adminAddress, arr: _arr, arrLength: _arrLength, arrStart: _arrStart };
}

function storeTupleRoyalUsdt$Data(source: RoyalUsdt$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.adminAddress);
    builder.writeCell(source.arr.size > 0 ? beginCell().storeDictDirect(source.arr, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
    builder.writeNumber(source.arrLength);
    builder.writeNumber(source.arrStart);
    return builder.build();
}

function dictValueParserRoyalUsdt$Data(): DictionaryValue<RoyalUsdt$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRoyalUsdt$Data(src)).endCell());
        },
        parse: (src) => {
            return loadRoyalUsdt$Data(src.loadRef().beginParse());
        }
    }
}

 type RoyalUsdt_init_args = {
    $$type: 'RoyalUsdt_init_args';
    admin: Address;
}

function initRoyalUsdt_init_args(src: RoyalUsdt_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.admin);
    };
}

async function RoyalUsdt_init(admin: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initRoyalUsdt_init_args({ $$type: 'RoyalUsdt_init_args', admin })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const RoyalUsdt_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    54615: { message: `Insufficient balance` },
    62026: { message: `You're not authorized to make this function call` },
}

const RoyalUsdt_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"BuySpin","header":3479065657,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ChangeAdmin","header":636739454,"fields":[{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ClaimWinnings","header":1012044212,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TransferReward","header":2815672846,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Withdraw","header":2856211534,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"recipient","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TransferEvent","header":772744475,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"recipient","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SpinBuyEvent","header":2481024384,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"jetton_amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":false}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"RoyalUsdt$Data","header":null,"fields":[{"name":"adminAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"arr","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"arrLength","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"arrStart","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
]

const RoyalUsdt_getters: ABIGetter[] = [
    {"name":"contractBalance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

export const RoyalUsdt_getterMapping: { [key: string]: string } = {
    'contractBalance': 'getContractBalance',
}

const RoyalUsdt_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"BuySpin"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeAdmin"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ClaimWinnings"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class RoyalUsdt implements Contract {
    
    static async init(admin: Address) {
        return await RoyalUsdt_init(admin);
    }
    
    static async fromInit(admin: Address) {
        const init = await RoyalUsdt_init(admin);
        const address = contractAddress(0, init);
        return new RoyalUsdt(address, init);
    }
    
    static fromAddress(address: Address) {
        return new RoyalUsdt(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  RoyalUsdt_types,
        getters: RoyalUsdt_getters,
        receivers: RoyalUsdt_receivers,
        errors: RoyalUsdt_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | BuySpin | ChangeAdmin | ClaimWinnings | Withdraw | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BuySpin') {
            body = beginCell().store(storeBuySpin(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeAdmin') {
            body = beginCell().store(storeChangeAdmin(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ClaimWinnings') {
            body = beginCell().store(storeClaimWinnings(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Withdraw') {
            body = beginCell().store(storeWithdraw(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getContractBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('contractBalance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}

export{
    loadGetterTupleBuySpin,
    loadTupleStateInit,
    loadGetterTupleChangeAdmin,
    loadGetterTupleStateInit,
    storeTupleStateInit,
    dictValueParserBuySpin,
    dictValueParserStateInit,
    loadTupleStdAddress,
    loadGetterTupleStdAddress,
    storeTupleStdAddress,
    dictValueParserStdAddress,
    loadTupleVarAddress,
    loadGetterTupleVarAddress,
    dictValueParserVarAddress,
    storeTupleVarAddress,
    loadTupleContext,
    storeTupleContext,
    loadGetterTupleContext,
    dictValueParserContext,
    loadTupleSendParameters,
    loadGetterTupleSendParameters,
    storeTupleSendParameters,
    dictValueParserSendParameters,
    loadTupleDeploy,
    loadGetterTupleDeploy,
    storeTupleDeploy,
    dictValueParserDeploy,
    loadTupleDeployOk,
    loadGetterTupleDeployOk,
    storeTupleDeployOk,
    dictValueParserDeployOk,
    loadTupleFactoryDeploy,
    loadGetterTupleFactoryDeploy,
    storeTupleFactoryDeploy,
    dictValueParserFactoryDeploy,
    loadTupleBuySpin,
    storeTupleBuySpin,
    loadTupleChangeAdmin,
    storeTupleChangeAdmin,
    dictValueParserChangeAdmin,
    loadTupleClaimWinnings,
    storeTupleClaimWinnings,
    loadGetterTupleClaimWinnings,
    dictValueParserClaimWinnings,loadTupleTransferReward,
    loadGetterTupleTransferReward,
    storeTupleTransferReward,
    dictValueParserTransferReward,
    loadTupleWithdraw,
    loadGetterTupleWithdraw,
    storeTupleWithdraw,
    dictValueParserWithdraw,
    loadTupleTransferEvent,
    dictValueParserTransferEvent, storeTupleTransferEvent,
    loadGetterTupleTransferEvent,
    loadTupleSpinBuyEvent,
    loadGetterTupleSpinBuyEvent,
    storeTupleSpinBuyEvent,
    dictValueParserSpinBuyEvent,
    loadTupleTokenTransfer,
    storeTupleTokenTransfer,
    loadGetterTupleTokenTransfer,
    dictValueParserTokenTransfer,
    loadTupleTokenNotification,
    loadGetterTupleTokenNotification,
    storeTupleTokenNotification,
    dictValueParserTokenNotification,
    loadTupleRoyalUsdt$Data,
    loadGetterTupleRoyalUsdt$Data,
    storeTupleRoyalUsdt$Data,
    dictValueParserRoyalUsdt$Data

}