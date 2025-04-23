"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toProviderResponse = toProviderResponse;
function toProviderResponse(provider) {
    return {
        kode_provider: provider.kode_provider,
        nama_provider: provider.nama_provider,
        is_gangguan: provider.is_gangguan,
        prefix: provider.prefix,
        minimal: provider.minimal,
        maxsimal: provider.maxsimal
    };
}
