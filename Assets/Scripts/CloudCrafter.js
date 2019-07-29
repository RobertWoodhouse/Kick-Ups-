#pragma strict

// Fields set in the Unity Inspector pane
public var numClouds : int = 40; // The No. of clouds to make
public var cloudPrefabs : GameObject[]; // The prefabs for the clouds
public var cloudPosMin : Vector3; // Min position of each cloud
public var cloudPosMax : Vector3; // Max position of each cloud
public var cloudScaleMin : float = 1; // Min scale of each cloud
public var cloudScaleMax : float = 5; // Max scale of each cloud
public var cloudSpeedMult : float = 0.5f; // Adjusts speed of clouds

public var ______________ : boolean;

// Fields set dynamically
public var cloudInstances : GameObject[];

function Awake()
{
	// Make an array large enough to hold all the Cloud_ instances
	cloudInstances = new GameObject[numClouds];
	// Find the CloudAnchor parent GameObject
	var anchor : GameObject = GameObject.Find("CloudAnchor");
	// Iterate through and make Cloud_s
	var cloud : GameObject;
	for (var i : int = 0; i < numClouds; i++)
	{
		// Pick an int between 0 and cloudPrefabs.Length-1
		// Random.Range will not ever pick as high as the top number
		var prefabNum : int = Random.Range(0, cloudPrefabs.Length);
		// Make an instance
		cloud = Instantiate(cloudPrefabs[prefabNum]) as GameObject;
		// Position cloud
		var cPos : Vector3 = Vector3.zero;
		cPos.x = Random.Range(cloudPosMin.x, cloudPosMax.x);
		cPos.y = Random.Range(cloudPosMin.y, cloudPosMax.y);
		// Scale cloud
		var scaleU : float = Random.value;
		var scaleVal : float = Mathf.Lerp(cloudScaleMin, cloudScaleMax, scaleU);
		// Smaller clouds (with smaller scaleU) should be nearer the ground)
		cPos.y = Mathf.Lerp(cloudPosMin.y, cPos.y, scaleU);
		// Smaller clouds should be further away
		cPos.z = 100 - 90 * scaleU;
		// Apply these transforms to the cloud
		cloud.transform.position = cPos;
		cloud.transform.localScale = Vector3.one * scaleVal;
		// Make cloud a child of the anchor
		cloud.transform.parent = anchor.transform;
		// Add the cloud to cloudInstances
		cloudInstances[i] = cloud;
	}
}

function Update()
{
	// Iterate over each cloud that was created
	for (var cloud : GameObject in cloudInstances)
	{
		// Get the cloud scale and position
		var scaleVal : float = cloud.transform.localScale.x;
		var cPos : Vector3 = cloud.transform.position;
		// Move larger clouds faster
		cPos.x -= scaleVal * Time.deltaTime * cloudSpeedMult;
		// If a cloud has moved too far to the left...
		if (cPos.x <= cloudPosMin.x)
		{
			// Move it to the far right
			cPos.x = cloudPosMax.x;
		}
		// Apply the new position to cloud
		cloud.transform.position = cPos;
	}
}