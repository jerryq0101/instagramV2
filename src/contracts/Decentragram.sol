pragma solidity ^0.5.0;

contract Decentragram {
  // Code goes here...

    string public name = "Decentragram";


    uint public imageCount = 0;
    // stores images (ipfs)

    mapping (uint => Image) public images;

    struct Image {
        uint id;
        string hash; // ipfs image hash
        string description; // image desc
        uint tipAmount;
        address payable author; // uploader
        string authorName;
    }

    // image created event

    event ImageCreated(
        uint id,
        string hash,
        string description,
        uint tipAmount,
        address payable author,
        string authorName
    );

    // image tipped event
    event ImageTipped (
        uint id,
        string hash,
        string description,
        uint tipAmount,
        address payable author
    );



    // creates images (using ipfs)

    function uploadImage(string memory _imgHash, string memory _description, string memory _authorName) public {

        // make sure there is img _imgHash
        require(bytes(_imgHash).length > 0);

        // make sure image description is not blank
        require(bytes(_description).length > 0);

        // requires uploader/caller address exists
        require(msg.sender != address(0x0));


        //increment imageCount - no repetition
        imageCount ++;

        // add image to contract
        images[imageCount] = Image(imageCount, _imgHash, _description, 0, msg.sender, _authorName);
                                                                // no tips yet

        emit ImageCreated(imageCount, _imgHash, _description, 0, msg.sender, _authorName);
    }



    // tipping function

    function tipImageOwner(uint _id) public payable {

        // make sure id is valid
        require(_id > 0 && _id <= imageCount);

        // get image from storage
        Image memory _image = images[_id];
        // get author
        address payable _author = _image.author;

        // pay the author by sending them ether
        address(_author).transfer(msg.value);
            // msg.value: the amount of crypto that is sent in when called

        // increment the tip amount
        _image.tipAmount = _image.tipAmount + msg.value;

        // update the _image
        images[_id] = _image;

        //emit event

        emit ImageTipped(_id, _image.hash, _image.description, _image.tipAmount, _author);
    }

}