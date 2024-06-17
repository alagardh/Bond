// Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

const daml = require('@digitalasset/daml-ledger');
const fs = require('fs');

const [host, port] = ['ec2-54-161-111-15.compute-1.amazonaws.com', 6865];



function getTemplateIds(archivePayload) {
    const templateNames = [];
    const archive = daml.lf.ArchivePayload.deserializeBinary(archivePayload).getDamlLf1();
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
daml.DamlLedgerClient.connect({ host: host, port: port, grpcOptions: grpcOptions }, (error, client) => {
    if (error) throw error;
    let first = true;
    client.packageClient.listPackages((error, response) => {
        if (error) throw error;
        for (const packageId of response.packageIds) {
            client.packageClient.getPackage(packageId, (error, response) => {
                if (error) throw error;
                const templateNames = getTemplateIds(response.archivePayload);
                for (const {moduleName, entityName} of templateNames) {
                    const name = `${moduleName}:${entityName}`;
                    console.log(name);
                    if(name == 'Account:Account'){
                        console.log(packageId);
                    }
                   
                    first = false;
                }
            });
        }
    });
});



