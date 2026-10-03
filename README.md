# REDOUBT 🛡️⚡
### The Zcash Zero-Risk Flight Simulator & Interactive Onboarding Engine
> **Built for the ZECATHON ($100k Zcash Privacy Hackathon) — Wildcard Track**  
> *In collaboration with [@zksnarks_](https://x.com/zksnarks_)*

```
VAULT → INGRESS (t-addr) → SHIELD (Halo 2) → CLOAK (z-to-z) → CERTIFY
```

---

## The Core Question
> *"Why should the Zcash ecosystem force first-time users to risk their real savings, navigate four conflicting address formats, and guess what 'Orchard' means before ever experiencing a private transaction?"*

Over **80% of Zcash transactions remain nakedly transparent** on public ledgers because new users are paralyzed by fear of making an irreversible mistake. 

**REDOUBT** is the aviation flight simulator for Zcash. It gives beginners somatic muscle memory in 90 seconds through a dual-cylinder interactive cockpit—letting them test-drive wallet vaulting, exchange ingress, and zero-knowledge shielding with zero risk before touching a single cent.

---

## Dual Ingress Paths (For Judges)

### Path A: The 15-Second Tactile Experience
1. Open the interactive web application in your browser.
2. Select your client (**Zashi** or **Ywallet**) and generate a real BIP-39 cryptographic seed.
3. Simulate a CEX withdrawal: watch the **Panopticon Surveillance Mirror** on the right flash RED as your balance and transaction history leak publicly.
4. Click **"Shield to Orchard Pool"**: watch the Halo 2 zero-knowledge proof compile live, cloaking the ledger into ciphertext.
5. Complete the flight training to unlock your verified **Shielded Flight Certificate** and a real-world scannable **ZIP-321 QR code**.

### Path B: The Sub-Second Deterministic Proof
Run the deterministic cryptographic test harness directly in your terminal:
```bash
npm test
```
*Output (Executed in < 30ms):*
```text
 ✓ src/test/simulator.test.ts (5 tests) 27ms

 Test Files  1 passed (1)
      Tests  5 passed (5)
   Duration  1.54s (tests 27ms)
```

---

## The 5 Required Bounty Milestones (100% Covered)

| Step | Bounty Requirement | How REDOUBT Delivers It |
| :--- | :--- | :--- |
| **1. Wallet Setup** | Choosing client & seed security | Real Web Crypto BIP-39 entropy generator (24 words) with interactive backup challenge and client comparison (Zashi vs Ywallet). |
| **2. Getting ZEC** | Buying & withdrawing | Simulated CEX withdrawal to a transparent address (`t1...`). Explains why exchanges default to transparent and how chain analysis monitors them. |
| **3. Shielding & Unshielding** | Postcard vs. Envelope analogy | Dual-balance ledger with live animated Halo 2 zero-knowledge circuit compilation. Explains why unshielding leaks metadata. |
| **4. Sending & Receiving** | Private z-to-z transfers | Sends a cloaked transaction with an encrypted memo (ZIP-302 / ZIP-321) into a Unified Address (`u1...`). |
| **5. Real Flight Plan** | First real shielded transaction | Generates real scannable ZIP-321 QR codes for mobile wallets, links to official downloads, and issues a shareable Flight Certificate for X. |

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
