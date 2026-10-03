# REDOUBT 🛡️⚡
### The Zcash Zero-Risk Flight Simulator & Interactive Onboarding Engine
> **Built for the ZECATHON ($100k Zcash Privacy Hackathon) — Wildcard Track**  
> *In collaboration with [@zksnarks_](https://x.com/zksnarks_)*

```
COMPARE (Postcard vs Envelope) → INGRESS (t1...) → SHIELD (u1...) → DISPATCH (ZIP-302) → GRADUATE (Zashi/Ywallet)
```

---

## The Core Question
> *"Why should the Zcash ecosystem force first-time users to risk their real savings, navigate four conflicting address formats, and guess what 'Orchard' means before ever experiencing a private transaction?"*

Over **80% of Zcash transactions remain nakedly transparent** on public ledgers because new users are paralyzed by fear of making an irreversible mistake. 

**REDOUBT** is the aviation flight simulator for Zcash. It gives beginners somatic muscle memory in 90 seconds through a dual-cylinder interactive cockpit—letting them test-drive wallet vaulting, exchange ingress, and zero-knowledge shielding with zero risk before touching a single cent.

---

## Dual Ingress Paths (For Judges)

### Path A: The 90-Second Tactile Experience (Live Web)
1. Open the interactive flight deck at **[re-doubt-pi.vercel.app](https://re-doubt-pi.vercel.app)**.
2. **Phase 1 (Radar Check):** Flip between the Public Postcard (`t1...`) and the Sealed Envelope (`u1...`) to watch the live Surveillance Radar react in real time.
3. **Phase 2 (Practice Coins):** Claim 5.00 mock ZEC from a simulated CEX into a transparent address and watch the public ledger flash RED.
4. **Phase 3 (Shield Funds):** Click *"Shield 5.00 ZEC (Make It Invisible)"* to seal funds into the Orchard pool and watch the radar turn emerald green.
5. **Phase 4 (Encrypted Memo):** Transmit a confidential sealed dispatch (ZIP-302 authenticated memo) with live dual-reality inspection (What You See vs What Public Surveillance Sees).
6. **Phase 5 (Graduate):** Claim your verified **Flight Certificate (`ZEC-ORCHARD-...`)**, optionally test-drive the 24-word self-custody drill, and scan the **ZIP-321 QR code** into official mobile wallets (**Zashi** / **Ywallet**).

### Path B: The Sub-Second Deterministic Proof (Terminal)
Run the deterministic cryptographic test harness directly in your terminal:
```bash
npm test
```
*Output (Executed in < 40ms):*
```text
 ✓ src/test/simulator.test.ts (7 tests) 34ms

 Test Files  1 passed (1)
      Tests  7 passed (7)
   Duration  1.41s (tests 34ms)
```

---

## The 5 Required Bounty Milestones (100% Covered)

| Bounty Milestone | Product Phase | How REDOUBT Delivers It |
| :--- | :--- | :--- |
| **1. Postcard vs. Envelope Analogy** | **Phase 1: Radar Check** | Interactive dual-state toggle: visualizes transparent exposure (`t1...`) vs. zero-knowledge cloaking (`u1...`) before touching any coins. |
| **2. Getting ZEC (Exchange Ingress)** | **Phase 2: Practice ZEC** | 1-click simulated CEX withdrawal to a transparent address (`t1...`). Teaches why exchanges default to public ledgers and how graph analytics link identities. |
| **3. Shielding Funds (Public → Private)** | **Phase 3: Shield Funds** | 1-click shield into the Orchard pool with animated proof compilation. The Surveillance Radar flashes from blood red to emerald green. |
| **4. Sending & Receiving Private Memos** | **Phase 4: Encrypted Memo** | Transmits a confidential sealed dispatch inside an authenticated 512-byte payload (ZIP-302) with live dual-reality viewport. |
| **5. Wallet Setup & Real Flight Plan** | **Phase 5: Graduate** | Issues an on-chain style Flight Certificate for X, provides an optional BIP-39 CSPRNG 24-word self-custody drill, generates live ZIP-321 QR codes, and deep-links to Zashi / Ywallet. |

---

## The Radical Honesty Table

| Component | Status | Technical Implementation |
| :--- | :--- | :--- |
| **BIP-39 Mnemonic & Vault** | **100% REAL** | Standard 2048-word English wordlist, SHA-256 entropy checksum, Web Crypto API. |
| **Zcash Address Inspector** | **100% REAL** | Real parser classifying Transparent (`t1`/`t3`), Sapling (`zs1`), and Unified Addresses (`u1`) via ZIP 316. |
| **ZIP-321 Payment URIs** | **100% REAL** | Official Zcash URI schema (`zcash:u1...?amount=...&memo=...`) with URL-safe base64 memo encoding. |
| **Live Blockchain Telemetry** | **100% REAL** | Real-time REST queries to public block explorers fetching live block heights and network difficulty. |
| **Network Node Consensus** | **SIMULATED** | ZEC balances and exchange API responses are sandboxed in-browser so beginners never risk real money or pay gas fees while training. |

---

## The Security Lab (Attack It and Watch It Win)

| Attack / Adversarial Vector | Engine Behavior | Verification Result |
| :--- | :--- | :--- |
| **Tampered Mnemonic Checksum** | Fails SHA-256 checksum verification against wordlist residue | **REJECTED (Valid: False)** |
| **Mnemonic Type / Fuzz Attack** (`null`, numbers, wrong length) | Strict array and type validation guards against malformed buffers | **HALTED (Zero Runtime Throw)** |
| **Address Spoofing / EVM Injection** (`0x...` or `bc1...`) | ZIP-316 parser strictly validates prefixes (`t1`, `t3`, `zs1`, `u1`) | **FLAGGED (Invalid Address)** |
| **UTF-8 Multi-Byte Memo Overflow** (>512 bytes with 4-byte emojis) | Native `TextEncoder` byte calculation clamps at 512 bytes per ZIP-302 | **CLAMPED (Zero Buffer Crash)** |
| **Telemetry Network Outage / CORS** | Cross-browser fallback controller falls back to cached checkpoint | **GRACEFUL (No UI Freeze)** |

---

## Why the Sponsor is Load-Bearing (Sponsor Ablation Proof)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                            SPONSOR ABLATION MATRIX                                │
├──────────────────────────────┬──────────────────────────┬────────────────────────┤
│ METRIC                       │ WITH ZCASH ORCHARD POOL  │ WITHOUT ZCASH (BITCOIN/│
│                              │ (LOAD-BEARING ENGINE)    │ TRANSPARENT EVM)       │
├──────────────────────────────┼──────────────────────────┼────────────────────────┤
│ Public Amount Visibility     │ 0 ZEC (Encrypted in ZK)  │ 100% Leaked on Ledger  │
│ Sender/Receiver Linkability  │ Cryptographically Severed│ Graph Analysis Linked  │
│ Encrypted Memo Support       │ 512-Byte Authenticated   │ 0 Bytes (Naked Calldata│
│ Address Unification (ZIP-316)│ Unified Orchard/Sapling  │ Fragmented / Manual    │
└──────────────────────────────┴──────────────────────────┴────────────────────────┘
```

* **Engine:** Built specifically on Zcash's multi-pool cryptographic architecture: Unified Addresses (ZIP-316), the Orchard zero-knowledge pool, and ZIP-302 encrypted memo fields.
* **Patient:** Directly attacks the **Shielded Adoption Deficit**, converting transparent exchange holders into active shielded participants.
* **Ecosystem Connection:** Directly tailored to [@zksnarks_](https://x.com/zksnarks_) to celebrate digital privacy culture and verifiable onboarding.

---

## Local Development & Verification

```bash
# 1. Install dependencies
npm install

# 2. Run the deterministic test suite (< 50ms)
npm test

# 3. Build production bundle
npm run build

# 4. Launch local development server
npm run dev
```

---

## License
MIT — Open Source for the Zcash Ecosystem.
