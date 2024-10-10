// SPDX-License-Identifier: Unlicensed

pragma solidity >=0.7.0 <0.9.0;

// Context contract to provide information about the current execution context
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

// ERC20 Interface defining standard functions and events
interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

// ERC20 Metadata Interface extending IERC20 with additional functions
interface IERC20Metadata is IERC20 {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}

// SafeMath Library to perform safe arithmetic operations
library SafeMath {
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        require(c / a == b, "Multiplication overflow");
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "Division by zero");
        uint256 c = a / b;
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "Subtraction overflow");
        return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "Addition overflow");
        return c;
    }
}

// ERC20 Implementation
contract ERC20 is Context, IERC20, IERC20Metadata {
    using SafeMath for uint256;

    // Mappings for balances and allowances
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    // Token metadata
    uint256 private _totalSupply;
    string private _name;
    string private _symbol;

    // Constructor to initialize token name and symbol
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    // ERC20 Metadata functions
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    // ERC20 standard functions
    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view virtual override returns (uint256) {
        return _balances[account];
    }

    // Transfer tokens to a specified address
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    // View the remaining allowance a spender has
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }

    // Approve a spender to spend a specified amount
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, amount);
        return true;
    }

    // Transfer tokens from one address to another using allowance
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

    // Increase the allowance granted to a spender
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, allowance(owner, spender).add(addedValue));
        return true;
    }

    // Decrease the allowance granted to a spender
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        address owner = _msgSender();
        uint256 currentAllowance = allowance(owner, spender);
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        unchecked {
            _approve(owner, spender, currentAllowance.sub(subtractedValue));
        }

        return true;
    }

    // Internal function to handle transfers
    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(from, to, amount);

        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");
        unchecked {
            _balances[from] = fromBalance.sub(amount);
        }
        _balances[to] = _balances[to].add(amount);

        emit Transfer(from, to, amount);

        _afterTokenTransfer(from, to, amount);
    }

    // Internal function to mint tokens
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);

        _afterTokenTransfer(address(0), account, amount);
    }

    // Internal function to burn tokens
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _balances[account] = accountBalance.sub(amount);
        }
        _totalSupply = _totalSupply.sub(amount);

        emit Transfer(account, address(0), amount);

        _afterTokenTransfer(account, address(0), amount);
    }

    // Internal function to approve a spender
    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    // Internal function to spend allowance
    function _spendAllowance(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "ERC20: insufficient allowance");
            unchecked {
                _approve(owner, spender, currentAllowance.sub(amount));
            }
        }
    }

    // Hooks that can be overridden in derived contracts
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}
}

// Ownable contract to manage ownership
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    // Constructor to set the deployer as the initial owner
    constructor() {
        _transferOwnership(_msgSender());
    }

    // Function to view the owner
    function owner() public view virtual returns (address) {
        return _owner;
    }

    // Modifier to restrict functions to only the owner
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    // Function to renounce ownership
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    // Function to transfer ownership to a new address
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    // Internal function to handle ownership transfer
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

// ERC20 Token Interface extending ERC20 with additional functionalities
abstract contract Token is ERC20 {}

// Airdrop Contract
contract Airdrop is Ownable {
    using SafeMath for uint256;

    address public _tokenContract;
    uint256 public _airdropAmount;
    // Fee: 0.005 MATIC (in wei), set to 0 if no fees
    uint256 public _fee = 0.005 ether;

    // Mapping to store airdrop information using airdropId
    mapping(uint256 => AirdropInfo) public airdropInfos;

    // Struct to hold airdrop information
    struct AirdropInfo {
        uint256 id;
        address useraddress;
        string sessionId;
        string flowId;
        uint256 timestamp;
    }

    uint256 public totalAirdrops;

    event EtherTransfer(address beneficiary, uint amount);

    // Constructor to set token contract address and airdrop amount
    constructor(address tokenContract, uint256 airdropAmount) {
        _tokenContract = tokenContract;
        _airdropAmount = airdropAmount;
    }

    /**
     * @dev Function to drop tokens to users based on sessionId and flowId.
     * @param _sessionId Unique identifier for the user's session.
     * @param _flowId Identifier for the specific onboarding flow completed.
     * @return success Boolean indicating successful token transfer.
     */
    function dropTokens(string memory _sessionId, string memory _flowId) public payable returns (bool success) {
        require(msg.value >= _fee, "Not enough fees provided");
        require(Token(_tokenContract).balanceOf(address(this)) >= _airdropAmount, "Insufficient token balance in contract");
        require(Token(_tokenContract).transfer(msg.sender, _airdropAmount), "Token transfer failed");

        uint256 airdropId = totalAirdrops++;
        airdropInfos[airdropId] = AirdropInfo({
            id: airdropId,
            useraddress: msg.sender,
            sessionId: _sessionId,
            flowId: _flowId,
            timestamp: block.timestamp
        });

        return true;
    }

    /**
     * @dev Function to set a new token contract address.
     * @param tokenContract The address of the new token contract.
     */
    function setTokenContract(address tokenContract) external onlyOwner {
        _tokenContract = tokenContract;
    }

    /**
     * @dev Function to set a new airdrop amount.
     * @param airdropAmount The new airdrop amount.
     */
    function setAirdropAmount(uint256 airdropAmount) external onlyOwner {
        _airdropAmount = airdropAmount;
    }

    /**
     * @dev Function to set a new fee.
     * @param fee The new fee amount in wei.
     */
    function setFee(uint256 fee) external onlyOwner {
        _fee = fee;
    }

    /**
     * @dev Function to check the token balance of a specific token contract.
     * @param _tokenAddr The address of the token contract.
     * @return uint256 The token balance of the contract.
     */
    function tokenBalance(address _tokenAddr) public view returns (uint256) {
        return Token(_tokenAddr).balanceOf(address(this));
    }

    /**
     * @dev Function to withdraw tokens from the contract to a beneficiary.
     * @param beneficiary The address to receive the tokens.
     * @param _tokenAddr The address of the token contract.
     */
    function withdrawTokens(address beneficiary, address _tokenAddr) public onlyOwner {
        require(Token(_tokenAddr).transfer(beneficiary, Token(_tokenAddr).balanceOf(address(this))), "Token withdrawal failed");
    }

    /**
     * @dev Function to withdraw Ether from the contract to a beneficiary.
     * @param beneficiary The payable address to receive the Ether.
     */
    function withdrawEther(address payable beneficiary) public onlyOwner {
        beneficiary.transfer(address(this).balance);
    }

    /**
     * @dev Function to get the Ether balance of the contract.
     * @return uint256 The Ether balance of the contract.
     */
    function contractBalance() public view returns(uint256) {
        return address(this).balance;
    }

    /**
     * @dev Function to retrieve all airdrop records.
     * @return AirdropInfo[] An array of all airdrop records.
     */
    function getAllAirdrops() external view returns (AirdropInfo[] memory) {
        AirdropInfo[] memory _airdrops = new AirdropInfo[](totalAirdrops);
        for (uint256 i = 0; i < totalAirdrops; i++) {
            _airdrops[i] = airdropInfos[i];
        }
        return _airdrops;
    }
}