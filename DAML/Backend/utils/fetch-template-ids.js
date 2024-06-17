// Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

const ledger = require('@digitalasset/daml-ledger');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const damlDataType = ledger.daml;

const packageId  = "5c11a9096c3a386c33c05b0b7d0ad9058ca701c0203caf547c5120ec4b14b49b"

const [host, port, out] = readOptions();
const writer = out ? fs.createWriteStream(out) : process.stdout;

writer.write('{');
let closed = false;
process.on('beforeExit', () => {
    if (!closed) {
        writer.write('}\n');
        closed = true;
    }
});

function getTemplateIds(archivePayload) {
    const templateNames = [];
    const archive = ledger.lf.ArchivePayload.deserializeBinary(archivePayload).getDamlLf1();
    for (const damlModule of archive.getModulesList()) {
        if (damlModule.hasNameDname()) {
            const moduleName = damlModule.getNameDname().getSegmentsList().join('.');
            for (const template of damlModule.getTemplatesList()) {
                const templateName = template.getTyconDname().getSegmentsList().join('.');
                templateNames.push({moduleName: moduleName, entityName: templateName});
            }
        } else if (damlModule.hasNameInternedDname()) {
            const internedDottedNames = archive.getInternedDottedNamesList();
            const internedStrings = archive.getInternedStringsList();
            const i = damlModule.getNameInternedDname();
            const moduleName = internedDottedNames[i].getSegmentsInternedStrList().map(j => internedStrings[j]).join('.');
            for (const template of damlModule.getTemplatesList()) {
                const k = template.getTyconInternedDname();
                const templateName = internedDottedNames[k].getSegmentsInternedStrList().map(l => internedStrings[l]).join('.');
                templateNames.push({moduleName: moduleName, entityName: templateName});
            }
        }
    }
    return templateNames;
}

// This allows to download packages smaller than 50MB (after compression)
// Raise this if your packages is larger than this size
const grpcOptions = {
    'grpc.max_receive_message_length': 50 * 1024 * 1024
};
ledger.DamlLedgerClient.connect({ host: host, port: port, grpcOptions: grpcOptions }, (error, client) => {
    if (error) throw error;
    let first = true;
    client.packageClient.listPackages((error, response) => {
        if (error) throw error;
        console.log(response.packageIds);
        client.packageClient.getPackage(packageId, (error, response) => {
            if (error) throw error;
                const templateNames = getTemplateIds(response.archivePayload);
                const {moduleName, entityName} = templateNames[0];
                const name = `${moduleName}:${entityName}`;
                writer.write(`${first ? '' : ','}"${name}":${JSON.stringify({
                    packageId: packageId,
                    moduleName: moduleName,
                    entityName: entityName
                })}`);
                
                first = false;

            const request = createTempates({fromParty: "Solidity",toParty : "Hyperledger",
            packageId : packageId,
             moduleName:moduleName,templateName:entityName})
            console.log("daml parties " ,ledger.pa);
            client.commandClient.submitAndWait(request, (error, _) => {
                if (error) throw error;
                console.log(`Created Ping contract from ${sender} to ${receiver}.`);
            });
        });
    });
});

function createTempates(data){

    console.log(data);

    const request = {
        commands: {
            applicationId: data.moduleName,
            workflowId: `${data.moduleName}-${data.fromParty}`,
            commandId: uuidv4(),
            party: data.fromParty,
            list : [{
                commandType: 'create',
                templateId: {
                    packageId: data.packageId,
                    moduleName: data.moduleName,
                    entityName: data.templateName
                },
                arguments: {
                    fields: {
                        bcNetwork : damlDataType.party(data.fromParty),
                        bcToNetwork : damlDataType.party(data.toParty),
                        fromAccount : damlDataType.text("0x90298DeACeA8841729257fA3f4beAe9BD000004d"),
                        toAccount : damlDataType.text("0x895cCc9d0CDC0e39D7280BD148d8b10Eb86326B4"),
                        amountToTransfer : damlDataType.decimal("56.76"),
                        transactionCompleted : damlDataType.bool(false),
                        transactionCreatedOn : damlDataType.text("1995-08-31"),
                        transactionFailed: damlDataType.bool(false)
                        // bcNetwork: {
                        //     valueType: 'party',
                        //     party: data.fromParty
                        // },
                        // bcToNetwork: {
                        //     valueType: 'party',
                        //     party: data.toParty
                        // },
                        // fromAccount:{
                        //     valueType: 'text',
                        //     text: "0x90298DeACeA8841729257fA3f4beAe9BD000004d"
                        // },
                        // toAccount:{
                        //     valueType: 'text',
                        //     text: "0x895cCc9d0CDC0e39D7280BD148d8b10Eb86326B4"
                        // },
                        // amountToTransfer:{
                        //     valueType: 'decimal',
                        //     decimal: "23.45"
                        // },
                        // transactionCompleted:{
                        //     valueType: 'bool',
                        //     bool: false
                        // },
                        // transactionFailed:{
                        //     valueType: 'bool',
                        //     bool: false
                        // },
                        // transactionCreatedOn : {
                        //     valueType:'text',
                        //     text : '1995-08-31'
                        // }
                    }
                },
                // witnessParties: [ data.fromParty, data.toParty ],
                // signatories: [data.fromParty],
                // observers: [data.toParty]
            }],
            
            
        }
       
        }
        console.log(request);

        return request;
    }

   

function printUsageAndExit() {
    console.log('Usage: [-h/--host LEDGER_HOST] [-p/--port LEDGER_PORT] [-o/--out OUT_FILE]');
    console.log('Defaults to [host: localhost, port: 6865, out: stdout]');
    process.exit(-1);
}

function readOptions() {
    let host = undefined;
    let port = undefined;
    let out = undefined;
    for (let i = 2; i < process.argv.length; i += 2) {
        const option = process.argv[i];
        const argument = process.argv[i + 1];
        if (option === '-h' || option === '--host') {
            if (host !== undefined || argument === undefined) {
                printUsageAndExit();
            }
            host = argument;
        } else if (option === '-p' || option === '--port') {
            if (port !== undefined || argument === undefined) {
                printUsageAndExit();
            }
            port = argument;
        } else if (option === '-o' || option === '--out') {
            if (out !== undefined || argument === undefined) {
                printUsageAndExit();
            }
            out = argument;
        } else {
            printUsageAndExit();
        }
    }
    return [host || 'localhost', port || 6865, out];
}
