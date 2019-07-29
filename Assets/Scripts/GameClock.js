#pragma strict

static public var S : GameClock; // Singleton

// Timer
private var _timerSec : float = 00.0f;
private var _timerMin : float = 00.0f;
private var _timerHrs : float = 00.0f;

//GUI
private var _secGT : UI.Text;
private var _minGT : UI.Text;
private var _hrsGT : UI.Text;

function Start () 
{
	var secGO : GameObject = GameObject.Find("TimerSec");
	var minGO : GameObject = GameObject.Find("TimerMin");
	var hrsGO : GameObject = GameObject.Find("TimerHrs");

	_secGT = secGO.GetComponent.<UI.Text>();
	_minGT = minGO.GetComponent.<UI.Text>();
	_hrsGT = hrsGO.GetComponent.<UI.Text>();
}

function Update () 
{
	GameClock ();
}

function GameClock ()
{
	_timerSec += Time.deltaTime;
	
	if (_timerSec >= 59.9f)
	{
		_timerSec = 00.0f;
		_timerMin++;
	}

	if (_timerMin >= 59.9f)
	{
		_timerMin = 00.0f;
		_timerHrs++;
	}

	_secGT.text = ": " + _timerSec.ToString("F0"); // Round off to 0 decimals
	_minGT.text = ": " + _timerMin.ToString("F0"); // Round off to 0 decimals
	_hrsGT.text = _timerHrs.ToString("F0"); // Round off to 0 decimals
}